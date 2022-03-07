import JSONBig from "json-bigint"

const JSONLocal = JSONBig({strict: true ,useNativeBigInt: true});

export default JSONLocal;