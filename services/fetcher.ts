import _http from "@/utils/http";

const fetcher = (url: string) => _http.get(url).then((res) => res.data.result);

export default fetcher;
