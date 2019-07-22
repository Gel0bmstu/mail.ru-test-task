// export default class NetworkHandler {
// 	constructor() {};

// 	public send (
// 		path : string,
// 		method : string,
// 		data : string,	
// 		callback : any,
// 	) : void {
// 		const options : RequestInit = {
// 			body : data,
// 			// credentials: 'omit',			
// 			headers : {
// 				'Accept':  'application/json',
// 				'Access-Control-Allow-Origin' : '*',
// 				'Content-Type' : 'application/json',
// 				'Origin' : '*',
// 			},
// 			method : method,
// 		};

// 		fetch(path, options)
// 		.then( (response) : object => {
// 			const json : object = response.json;
// 			return json;
// 		})
// 		.then ( (res) => {
// 			callback(res);
// 		});
// 	}
// }