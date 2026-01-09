// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use serde::{Deserialize, Serialize};
use std::ffi::{CStr, CString};
use std::os::raw::c_char;

// Request structures - camelCase for TypeScript frontend
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct HttpRequest {
    pub method: Option<String>,
    pub url: Option<RequestUrl>,
    pub header: Option<Vec<RequestHeader>>,
    pub body: Option<RequestBody>,
    pub auth: Option<RequestAuth>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RequestUrl {
    pub raw: Option<String>,
    pub protocol: Option<String>,
    pub host: Option<Vec<String>>,
    pub path: Option<Vec<String>>,
    pub query: Option<Vec<QueryParam>>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct QueryParam {
    pub key: String,
    pub value: Option<String>,
    pub disabled: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RequestHeader {
    pub key: String,
    pub value: String,
    pub disabled: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RequestBody {
    pub mode: Option<String>,
    pub raw: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RequestAuth {
    #[serde(rename = "type")]
    pub auth_type: Option<String>,
    pub bearer: Option<Vec<AuthVariable>>,
    pub basic: Option<Vec<AuthVariable>>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AuthVariable {
    pub key: String,
    pub value: String,
}

// Response from core library - snake_case (as returned by ababil_core)
#[derive(Debug, Deserialize)]
pub struct CoreHttpResponse {
    pub status_code: u16,
    pub headers: Vec<(String, String)>,
    pub body: String,
    pub duration_ms: u64,
}

// Response to TypeScript frontend - camelCase
#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HttpResponse {
    pub status_code: u16,
    pub headers: Vec<(String, String)>,
    pub body: String,
    pub duration_ms: u64,
    pub error: Option<String>,
}

impl From<CoreHttpResponse> for HttpResponse {
    fn from(core: CoreHttpResponse) -> Self {
        HttpResponse {
            status_code: core.status_code,
            headers: core.headers,
            body: core.body,
            duration_ms: core.duration_ms,
            error: None,
        }
    }
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn make_http_request(request: HttpRequest) -> HttpResponse {
    // Serialize request to JSON
    let request_json = match serde_json::to_string(&request) {
        Ok(json) => json,
        Err(e) => {
            return HttpResponse {
                status_code: 0,
                headers: Vec::new(),
                body: String::new(),
                duration_ms: 0,
                error: Some(format!("Failed to serialize request: {}", e)),
            };
        }
    };

    // Convert to C string
    let c_string = match CString::new(request_json) {
        Ok(s) => s,
        Err(e) => {
            return HttpResponse {
                status_code: 0,
                headers: Vec::new(),
                body: String::new(),
                duration_ms: 0,
                error: Some(format!("Failed to create C string: {}", e)),
            };
        }
    };

    // Call the core library
    let result_ptr: *mut c_char = ababil_core::make_http_request(c_string.as_ptr());

    if result_ptr.is_null() {
        return HttpResponse {
            status_code: 0,
            headers: Vec::new(),
            body: String::new(),
            duration_ms: 0,
            error: Some("Core returned null response".to_string()),
        };
    }

    // Convert result back to Rust string
    let result_str = unsafe {
        let c_str = CStr::from_ptr(result_ptr);
        let result = c_str.to_string_lossy().into_owned();
        ababil_core::free_string(result_ptr);
        result
    };

    // Parse the response from core (snake_case)
    match serde_json::from_str::<CoreHttpResponse>(&result_str) {
        Ok(core_response) => core_response.into(),
        Err(e) => HttpResponse {
            status_code: 0,
            headers: Vec::new(),
            body: result_str,
            duration_ms: 0,
            error: Some(format!("Failed to parse response: {}", e)),
        },
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, make_http_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
