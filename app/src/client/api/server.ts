import { HTTPError } from "../../common/http"
import { JSONObject, JSONType } from "../../common/json"

export interface FetchData {
    method?: string
    params?: {
        [key: string]: string | number | boolean
    }
    body?: JSONObject
    headers?: {
        [key: string]: string
    }
}

async function fetchAPI(endPoint: string, data: FetchData = {}): Promise<Response> {
    let url = `/api${endPoint}`
    if (data.params !== undefined) {
        url += "?"

        for (const [key, val] of Object.entries(data.params)) {
            url += `${key}=${val}&`
        }

        // remove trailing ? if there are no params or & if there are
        url = url.slice(0, -1)
    }
    const res = await fetch(url, {
        method: data.method,
        headers: {
            "Content-Type": "application/json",
            ...data.headers
        },
        body: data.body !== undefined ? JSON.stringify(data.body) : undefined
    })
    if (res.ok) {
        return res
    }
    else {
        const error = HTTPError.fromJSON(await res.json())
        throw new Error(`Error fetching ${url}: ${error.status} ${error.message}`)
    }
}

async function fetchJSON<T extends JSONType>(endPoint: string, data: FetchData = {}): Promise<T> {
    return await (await fetchAPI(endPoint, data)).json()
}

export default { fetchAPI, fetchJSON }