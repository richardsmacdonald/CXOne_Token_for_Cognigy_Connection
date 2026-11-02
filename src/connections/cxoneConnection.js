// Connection = the encrypted key/value store you fill in inside Cognigy.AI.
// Every key below becomes a field on the connection form.
export const cxoneConnection = {
	type: "cxoneToken",
	label: "NICE CXOne Token",
	fields: [
		{ fieldName: "authorization" },
		{ fieldName: "grant_type" },
		{ fieldName: "username" },
		{ fieldName: "password" }
	]
};
