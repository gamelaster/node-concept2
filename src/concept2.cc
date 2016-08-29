#include <node.h>
#include <PM3DDICP.h>
#include <PM3CsafeCP.h>
#include <string>
#include <iostream>

namespace Concept2 {

	using v8::Exception;
	using v8::FunctionCallbackInfo;
	using v8::Isolate;
	using v8::Local;
	using v8::Number;
	using v8::Object;
	using v8::String;
	using v8::Value;
	using namespace std;

	/*void Add(const FunctionCallbackInfo<Value>& args) {
	  Isolate* isolate = args.GetIsolate();
	  tkcmdsetDDI_init();
	  // Check the number of arguments passed.
	  if (args.Length() < 2) {
		// Throw an Error that is passed back to JavaScript
		isolate->ThrowException(Exception::TypeError(
			String::NewFromUtf8(isolate, "Wrong number of arguments")));
		return;
	  }

	  // Check the argument types
	  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
		isolate->ThrowException(Exception::TypeError(
			String::NewFromUtf8(isolate, "Wrong arguments")));
		return;
	  }

	  // Perform the operation
	  double value = args[0]->NumberValue() + args[1]->NumberValue();
	  Local<Number> num = Number::New(isolate, value);

	  // Set the return value (using the passed in
	  // FunctionCallbackInfo<Value>&)
	  args.GetReturnValue().Set(num);
	}*/
	bool IsError(ERRCODE_T code, Isolate* isolate) {
		if (code != 0) {
			char errname[255];
			char errtext[255];
			tkcmdsetDDI_get_error_name(code, errname, 255);
			tkcmdsetDDI_get_error_text(code, errtext, 255);
			isolate->ThrowException(Exception::Error(
				String::NewFromUtf8(isolate, errtext)));
			return true;
		}
		return false;
	}

	void Initialize(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();
		ERRCODE_T code = tkcmdsetDDI_init();
		//std::cout << code << endl;
		if (IsError(code, isolate)) return;
	}

	void InitProtocol(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();
		ERRCODE_T code = tkcmdsetCSAFE_init_protocol(1000);
		if (IsError(code, isolate)) return;
	}


	void DiscoverPMs(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();
		if (args.Length() < 1) {
			isolate->ThrowException(Exception::TypeError(
				String::NewFromUtf8(isolate, "Wrong number of arguments")));
			return;
		}
		if (!args[0]->IsString()) {
			isolate->ThrowException(Exception::TypeError(
				String::NewFromUtf8(isolate, "Wrong arguments")));
			return;
		}
		char* deviceName = (char*) *v8::String::Utf8Value(args[0]->ToString());
		//cout << deviceName << endl;
		//cout << TKCMDSET_PM3_PRODUCT_NAME2 << endl;
		
		UINT16_T num_units;
		//cout << (char*)*v8::String::Utf8Value(args[0]->ToDetailString()) << endl; 
		ERRCODE_T code = tkcmdsetDDI_discover_pm3s((char*)*v8::String::Utf8Value(args[0]->ToDetailString()), 0, &num_units);
		if (IsError(code, isolate)) return;
		args.GetReturnValue().Set(Number::New(isolate, (double)num_units));
	}

	void ExecuteCommand(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();
		UINT16_T deviceIndex = (UINT16_T)args[0]->NumberValue();
		//cout << "ahoj" << endl;
		//cout << (char*)*v8::String::Utf8Value(args[1]->ToDetailString()) << endl;

		UINT32_T cmd[64];

		v8::Handle<v8::Array> array = v8::Handle<v8::Array>::Cast(args[1]);
		for (uint32_t i = 0; i < array->Length(); i++) {
			//cout << array->Get(i)->BooleanValue() << ",";
			cmd[i] = array->Get(i)->Int32Value();
		}


		//args[1]->Toa
		UINT32_T rsp_data[64];
		UINT16_T rsp_data_size = 100;
		ERRCODE_T code = tkcmdsetCSAFE_command(deviceIndex, array->Length(), cmd, &rsp_data_size, rsp_data);
		
		/*for (UINT16_T i = 0; i < rsp_data_size; i++)
			cout << rsp_data[i] << ", ";

		cout << endl;*/

		if (IsError(code, isolate)) return;
		v8::Handle<v8::Array> array2 = v8::Array::New(isolate, rsp_data_size);
		for (int i = 0; i < rsp_data_size; i++) {
			array2->Set(i, v8::Integer::New(isolate, rsp_data[i]));
		}
		/*for (UINT16_T i = 0; i < rsp_data_size; i++)
			cout << array2->Get(i)->Int32Value() << ", ";

		cout << endl;*/
		args.GetReturnValue().Set(array2);
	}

	void Init(Local<Object> exports) {
		NODE_SET_METHOD(exports, "init", Initialize);
		NODE_SET_METHOD(exports, "initProtocol", InitProtocol);
		NODE_SET_METHOD(exports, "discoverPMs", DiscoverPMs);
		NODE_SET_METHOD(exports, "executeCommand", ExecuteCommand);
	}

	NODE_MODULE(concept2, Init)

}