/*
*
* oh-my-json (Based on panda)
*
* The zenith of JSON manipulation
*
* @vinoskey524 • Hamet Kévin E. ODOUTAN • vinoskey524@gmail.com (Author)
* 
*/

/* ---------------------------------------------- Types ---------------------------------------------- */

type MAIN_TYPE = {
    init: () => OH_MY_JSON_TYPE
};

type OH_MY_JSON_TYPE = {
    /** 
    * Get data
    * @param json JSON object.
    * @param path The path to a key or array's index.
    */
    get: (json: JSON_DEFAULT_TYPE, path: GET_ARG_PATH_TYPE) => any,

    /** 
    * Update data
    * @param json JSON object.
    * @param updates JSON object containing the new values.
    */
    update: (json: JSON_DEFAULT_TYPE, updates: JSON_DEFAULT_TYPE) => JSON_DEFAULT_TYPE | undefined,

    /** 
    * Delete data
    * @param json JSON object.
    * @param path The path to a key or array's index.
    */
    delete: (json: JSON_DEFAULT_TYPE, path: DELETE_ARG_PATH_TYPE) => JSON_DEFAULT_TYPE | undefined,

    /** 
    * Sort a JSON object
    * @param json JSON object.
    * @param order [optional] asc | desc
    */
    sort: (json: JSON_DEFAULT_TYPE, order?: 'asc' | 'desc') => JSON_DEFAULT_TYPE | undefined,

    /** 
    * Merge multiple JSON objects
    * @param array An array of JSON objects.
    * @param deps [optional] Values.
    */
    merge: (array: JSON_DEFAULT_TYPE[], deps?: string[]) => JSON_DEFAULT_TYPE | undefined,

    /** 
    * Clone a JSON object
    * @param json JSON object.
    * @param preserve [optional] Path to maintain reference for.
    */
    clone: (json: JSON_DEFAULT_TYPE, preserve?: string | string[]) => JSON_DEFAULT_TYPE | undefined,

    /** 
    * Decompose a JSON object
    * @param json JSON object.
    */
    decompose: (json: JSON_DEFAULT_TYPE) => JSON_DEFAULT_TYPE | undefined,

    /** 
    * Simply a JSON object
    * @param json JSON object.
    */
    simplify: (json: JSON_DEFAULT_TYPE) => JSON_DEFAULT_TYPE | undefined,

    /** 
    * Build a JSON object
    * @param json JSON object.
    * @param deps [optional] Values.
    */
    build: (json: JSON_DEFAULT_TYPE, deps?: string[]) => JSON_DEFAULT_TYPE | undefined,

    /** 
    * Get a JSON object keys
    * @param json JSON object.
    * @param level [optional] Depth level.
    */
    keys: (json: JSON_DEFAULT_TYPE, level?: number) => string[] | undefined,

    /**
    * Get a JSON object values
    * @param json JSON object.
    * @param level [optional] Depth level.
    */
    values: (json: JSON_DEFAULT_TYPE, level?: number) => any[] | undefined,

    /**
    * Stringify a JSON object
    * @param json JSON object.
    * @param includeFunctions [optional] If true, function's codes will be stringified.
    */
    stringify: (json: JSON_DEFAULT_TYPE, includeFunctions?: boolean) => string | undefined,

    /**
    * Parse a stringified JSON object
    * @param text Valid stringified JSON object.
    */
    parse: (text: string) => JSON_DEFAULT_TYPE | undefined,

    /** 
    * Check if a JSON object is empty
    * @param json JSON object.
    */
    isEmpty: (json: JSON_DEFAULT_TYPE) => boolean,

    /** 
    * Check if a specific key exists.
    * @param json JSON object.
    * @param path [optional] The path to the key.
    */
    exists: (json: JSON_DEFAULT_TYPE, path: string | string[] | JSON_STRING_TYPE) => EXISTS_RETURN_TYPE,

    /** 
    * Get the depth of a JSON object
    * @param json JSON object.
    */
    depth: (json: JSON_DEFAULT_TYPE) => number,

    /**
    * Iterate throught a JSON object
    * @param json JSON object.
    * @param forEach Function to run on each field/entry.
    * @param level [optional] Depth level.
    * @param path [optional] The path to a key or array's index. 
    */
    iterate: (x: {
        json: JSON_DEFAULT_TYPE,
        /** Func: (level: number, path: string, key: string, value: any) => {} */
        forEach: ITERATE_ARG_FOREACH_TYPE,
        path?: string,
        level?: number
    }) => void
};

type GET_ARG_PATH_TYPE = string | string[] | JSON_STRING_TYPE;
type DELETE_ARG_PATH_TYPE = string | string[];
type EXISTS_RETURN_TYPE = boolean | boolean[] | JSON_BOOLEAN_TYPE;
type ITERATE_ARG_FOREACH_TYPE = Function | ((level: number, path: string, key: string, value: any) => void);

type GET_REAL_TYPE_RETURN_TYPE = { type: VALID_TYPES_TYPE, valid: boolean };

type VALID_TYPES_TYPE = 'bigint' | 'number' | 'string' | 'boolean' | 'function' | 'symbol' | 'array' | 'json' | 'null' | 'undefined';

type JSON_DEFAULT_TYPE = { [key: string]: any };
type JSON_STRING_TYPE = { [key: string]: string };
type JSON_BOOLEAN_TYPE = { [key: string]: boolean };

type FUNCTION_DEFAULT_RETURN_TYPE = {
    ok: boolean,
    log: string,
    data: any
};

type SCOPE_TYPE = {
    [scopeId: string]: {
        id: string,
        data: JSON_DEFAULT_TYPE
    }
};

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ---------------------------------------------- Constants ---------------------------------------------- */

const _dev_ = false;
const _default_valid_types_: VALID_TYPES_TYPE[] = ['bigint', 'string', 'number', 'boolean', 'function', 'symbol', 'array', 'json', 'null', 'undefined'];

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ---------------------------------------------- Data logistic ---------------------------------------------- */

/* Scope */
const scopeDATA: { current: SCOPE_TYPE } = { current: {} }

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ---------------------------------------------- Functions ---------------------------------------------- */

/** Log */
const logFunc = (...log: any[]): void => { if (_dev_) console.log(...log) };

/** Permanent log */
const plogFunc = (...log: any[]): void => { console.log(...log) };

/** Generate ID */
const generateIdFunc = (): string => {
    let id = '';
    const val = '0aW9zXe8CrVt1By5NuA46iZ3oEpRmTlYkUjIhOgPfMdQsSqDwFxGcHvJbKnL';
    for (var i = 0; i < 14; i++) id += val.charAt(Math.floor(Math.random() * 36));
    return id;
};

/** Check if a property exists */
const hasPropertyFunc = (x: JSON_DEFAULT_TYPE, y: string): boolean => {
    const obj = (typeof x === 'object' && x !== null) ? x : {};
    return Object.prototype.hasOwnProperty.call(obj, y);
};

/** Detect function type "sync/async" */
const getFunctionTypeFunc = (func: Function): 'sync' | 'async' => {
    const isSync = func.constructor.name === 'Function';
    return isSync ? 'sync' : 'async';
};

/** Get real type */
const getRealTypeFunc = (data: any, validTypes?: VALID_TYPES_TYPE[]): GET_REAL_TYPE_RETURN_TYPE => {
    const valids = validTypes || _default_valid_types_;

    let typ = typeof data;
    if (typ === 'object') typ = ((data === null) ? 'null' : Array.isArray(data) ? 'array' : 'json') as any;

    const type: VALID_TYPES_TYPE = typ as VALID_TYPES_TYPE;
    const valid = valids.includes(type);

    return { type, valid };
};

/** Format path */
const formatPathFunc = (x: { path: string, removeLastBracket?: true }): string => {
    let path = x.path.replaceAll('][', '_').replaceAll('].[', '_');
    if (x.removeLastBracket) {
        const pathSplit = path.split('');
        if (pathSplit[pathSplit.length - 1] === ']') pathSplit.pop();
        path = pathSplit.join('');
    }
    return path;
};

/** Get path type */
const getPathTypeFunc = (path: string): 'array' | 'json' => (path[0] === '[') && (path[path.length - 1] === ']') ? 'array' : 'json';

/** 
* Append data into a JSON Object 
* Warning: It will directly modify the source/original object. 
*/
const jsonAppendDataFunc = (x: { sourceObj: JSON_DEFAULT_TYPE, pathChain: string, data: any, filter?: string[] }): JSON_DEFAULT_TYPE => {
    const sourceObj = x.sourceObj;
    let cursor: any = sourceObj;
    try {
        const pathChain = x.pathChain;
        const value = x.data;
        const filter = x.filter;

        const pathTab = pathChain.split('.');
        let cursorType: 'json' | 'array' | undefined = 'json';

        for (let n = 0; n < pathTab.length; n++) {
            const currentPath = pathTab[n]; /* current path */
            const nextPath = pathTab[n + 1] || undefined;

            /* True if the current path is an array index */
            const isArrayIndex = getPathTypeFunc(currentPath) === 'array';

            /* - */
            if (nextPath) { /* Navigate through the JSON tree */
                const currentPathType = getPathTypeFunc(nextPath);
                if (!cursorType)
                    continue;

                /* - */
                let arrayInit: any[] | undefined = undefined;
                if (currentPathType === 'array' && filter) {
                    const idx = n + 1;
                    arrayInit = buildArrayFromIndexPatternFunc({ patchChain: filter!, pathIndex: idx });
                }

                if (!hasPropertyFunc(cursor, currentPath)) {
                    if (isArrayIndex) {
                        const idxes = currentPath.replaceAll('[', '').replaceAll(']', '').split('_');
                        for (let d = 0; d < idxes.length; d++) {
                            const idx = Number(idxes[d]);
                            const isLastLoop = d === (idxes.length - 1);
                            const cursorVal = cursor[idx];
                            if (isLastLoop)
                                cursor[idx] =
                                    currentPathType === 'json' ?
                                        cursorVal === null ?
                                            {} :
                                            cursorVal :
                                        arrayInit;
                            cursor = cursor[idx];
                        }

                    } else {
                        cursor[currentPath] = currentPathType === 'json' ? {} : arrayInit;
                        cursor = cursor[currentPath];
                    }

                } else {
                    if (currentPathType === 'array' && cursor[currentPath] === undefined)
                        cursor[currentPath] = arrayInit;
                    cursor = cursor[currentPath];
                }

                /* Set cursor type */
                cursorType =
                    getRealTypeFunc(cursor).type === 'array' ?
                        'array' :
                        getRealTypeFunc(cursor).type === 'json' ?
                            'json' : undefined;

            } else { /* Set value */
                switch (cursorType) {
                    case 'json': { cursor[currentPath] = value } break;

                    case 'array': {
                        const tab: any[] = currentPath.replaceAll('[', '').replaceAll(']', '').split('_');
                        for (let k = 0; k < tab.length; k++) {
                            const idx = Number(tab[k]);
                            const isLastLoop = k === (tab.length - 1);
                            if (!isLastLoop)
                                cursor = cursor[idx];
                            else
                                cursor[idx] = value;
                        }
                    } break;

                    default: { };
                };
            }
        }

    } catch (e: any) { logFunc('Err :: jsonAppendDataFunc() =>', e.message) }
    return cursor;
};

/** Extract data from JSON */
const extractDataFunc = (x: { json: JSON_DEFAULT_TYPE, path: string }): any => {
    const jsonData = x.json;
    const path = formatPathFunc({ path: x.path });

    let cursor: any = undefined;
    const split = path.split('.');

    for (let i = 0; i < split.length; i++) {
        const paf = split[i];
        const isArr: boolean = getPathTypeFunc(paf) === 'array';
        switch (isArr) {
            case true: {
                const tab = paf.replaceAll('[', '').replaceAll(']', '').split('_');
                for (let n = 0; n < tab.length; n++) {
                    const idx = Number(tab[n]);
                    cursor = cursor[idx]
                }
            } break;

            case false: {
                cursor = (i === 0) ? jsonData[paf] : cursor[paf];
            } break;

            default: { };
        };
    }

    return cursor;
};

/** Structured clone */
const structuredCloneFunc = (json: JSON_DEFAULT_TYPE): JSON_DEFAULT_TYPE | undefined => {
    try { return structuredClone(json) }
    catch (e) { return undefined }
};

/** Clone JSON */
const cloneJSONFunc = (json: JSON_DEFAULT_TYPE, preserve?: string | string[]): JSON_DEFAULT_TYPE => {
    /* TLV */
    const a = topLevelJsonFunc({ data: json });
    if (!a.ok)
        throw new Error(a.log);
    const tlv = a.data;

    /* - */
    const scopeId = generateIdFunc();
    scopeDATA.current[scopeId] = { id: scopeId, data: tlv };

    /* - */
    if (preserve) {
        const pre = Array.isArray(preserve) ? preserve : [preserve];
        for (let i = 0; i < pre.length; i++) {
            const path = resolvePathFunc({ scopeId, path: pre[i] });
            const xtract = extractDataFunc({ json, path });

            const obj = JSON.parse(`{"${path}": null}`);
            Object.assign(tlv, obj);

            tlv[path] = xtract;
        }
    }

    /* Build */
    const b = reverseTopLevelJsonFunc({ data: tlv });
    if (!b.ok)
        throw new Error(b.log);
    const build = b.data;

    /* Clear scope */
    delete scopeDATA.current[scopeId];

    /* - */
    return build;
};

/** Build array from index pattern */
const buildArrayFromIndexPatternFunc = (x: { patchChain: any[], pathIndex: number }): any[] => {
    const patchChain = x.patchChain;
    const pathIndex = x.pathIndex;

    /* 0. Collect indexes and get array's max depth */
    let indexCollector: JSON_DEFAULT_TYPE = {};
    let maxDepth: number = 0;
    for (let l = 0; l < patchChain.length; l++) {
        /* Collect indexes */
        const spt = patchChain[l].split('.');
        const targ = spt[pathIndex].replaceAll('[', '').replaceAll(']', '');
        indexCollector[targ] = targ;

        /* Get array's max depth */
        const arr: any[] = targ.split('_');
        const alen = arr.length - 1;
        if (alen > maxDepth) maxDepth = alen;
    }

    /* 1. Create the top-level array "tab" */
    let tab: any[] = [];
    const lengthsTab = Object.keys(indexCollector).sort((a, b) => a.localeCompare(b));
    let l = 0;
    for (let t = 0; t < lengthsTab.length; t++) {
        const n = Number(lengthsTab[t].split('_')[0]);
        if (n > l) l = n;
    }
    tab = Array(l + 1).fill(undefined).map(() => null);

    /* 2. Create nested arrays */
    const hasNestedArr = maxDepth > 0;
    if (hasNestedArr)
        for (let h = 1; h <= maxDepth; h++) {
            const deepLevel = h;
            const len = deepLevel + 1;
            let filta = lengthsTab.filter((e) => e.split('_').length >= len);

            /* Limit deph to current "len", for each entry of "filter" */
            const newFilter: JSON_DEFAULT_TYPE = {};
            for (let s = 0; s < filta.length; s++) {
                const entry = filta[s];
                const split = entry.split('_');
                let val = entry;
                if (split.length > len) {
                    const arr = split.slice(0, len);
                    val = arr.join('_');
                };
                newFilter[val] = val;
            }
            filta = Object.keys(newFilter).sort((a, b) => a.localeCompare(b));

            /* Extract prefixes */
            const prefixes: JSON_DEFAULT_TYPE = {};
            for (let p = 0; p < filta.length; p++) {
                const arr = filta[p].split('_');
                let pfx = '';
                for (let f = 0; f < deepLevel; f++)
                    pfx = pfx + (pfx.length > 0 ? '_' : '') + arr[f];
                prefixes[pfx] = pfx;
            }

            /* Process each prefix */
            for (let key in prefixes) {
                const prefix = prefixes[key]; /* current prefix */

                /* Get nested array length */
                const indexCombinaison = filta.filter((e) => e.indexOf(prefix) === 0).sort((a, b) => a.localeCompare(b)); /* Extract all index combinaison, belonging to the current prefix */
                const joinedNestedIndex = indexCombinaison.join('_').replaceAll(`${prefix}_`, '');
                const nestedLength = Number(joinedNestedIndex.split('_').reverse()[0]) + 1;

                /* Create nested arrays */
                const splt = prefix.split('_');
                let tabRef: any[] = tab;
                for (let s = 0; s < splt.length; s++) {
                    const currentIndex = Number(splt[s]);
                    const isLastLoop = s === splt.length - 1;
                    if (!isLastLoop) tabRef = tabRef[currentIndex];
                    else tabRef[currentIndex] = Array(nestedLength).fill(undefined).map(() => null);
                }
            }
        }

    /* - */
    return tab;
};

/** Extract main form a path */
const extractMainKeyFunc = (path: string): string => {
    const fpath = formatPathFunc({ path });
    const split = fpath.split('.').reverse();
    let mkey = '';
    for (let i = 0; i < split.length; i++) {
        if (mkey.length > 0)
            break;
        const paf = split[i];
        if (getPathTypeFunc(paf) === 'array')
            continue;
        mkey = paf;
    }
    return mkey;
};

/** Resolve path */
const resolvePathFunc = (x: { scopeId: string, path: string }): string => {
    const scope = scopeDATA.current[x.scopeId];
    const jsonData = scope.data;
    const path = x.path;

    /* - */
    if (!path.includes('...')) return path;

    /* - */
    const split = path.split('...');
    let duo = [split.shift(), null];
    do {
        /* - */
        duo[1] = split.shift();

        /* Filter */
        const p0 = duo[0] + '.';
        const p1 = '.' + duo[1];
        const tab = Object.keys(jsonData);
        const filter = tab.filter((e) =>
            e.includes(p0) && e.indexOf(p0) === 0 &&
            e.includes(p1) && e.indexOf(p1) > (p0.length - 1)
        );

        /* If no path found */
        const flen = filter.length;
        if (flen === 0)
            throw new Error(`Impossible to resolve path "${path}"`);

        /* If more than one path found */
        if (flen > 1) {
            const format = formatPathFunc({ path: filter[0] });
            const tab = format.split('.');

            /* - */
            const targ = tab.reverse()[0];
            const isArray = getPathTypeFunc(targ) === 'array';
            if (!isArray)
                throw new Error(`Many paths found for "${path}"`);
            else {
                const mkey = extractMainKeyFunc(path);
                let many = false;

                /* - */
                let idx = -1;
                for (let i = 0; i < flen; i++) {
                    const paf = filter[i];
                    const pos = paf.indexOf(mkey);
                    /* Set index the first time */
                    if (idx === -1) {
                        idx = pos;
                        continue;
                    }
                    /* - */
                    if (pos !== idx) {
                        many = true;
                        break;
                    }
                }

                /* - */
                if (many)
                    throw new Error(`Many paths found for "${path}"`);
            }

            /* - */
            tab.reverse();
            let arr: string[] = [];
            for (let m = 0; m < tab.length; m++) {
                const paf = tab[m];
                arr.push(paf)
                if (paf === duo[1])
                    break;
            }

            /* - */
            duo[0] = arr.join('.');
        }
        /* If only one path found */
        else duo[0] = filter[0];

    } while (split.length !== 0);

    /* Return full path */
    return duo[0];
};

/** Extract pandata from path */
const extractPandataFromPathFunc = (x: { scopeId: string, path: string }): FUNCTION_DEFAULT_RETURN_TYPE => {
    let res: FUNCTION_DEFAULT_RETURN_TYPE = { ok: true, log: '', data: undefined };
    try {
        const scope = scopeDATA.current[x.scopeId];
        const jsonData = scope.data;
        let path = x.path;

        /* Format path */
        path = formatPathFunc({ path, removeLastBracket: true });
        path = resolvePathFunc({ scopeId: scope.id, path });

        /* Seek path */
        const keys = Object.keys(jsonData);
        const filter = keys.filter((e) => e.includes(path) && e.indexOf(path) === 0);
        if (filter.length === 0)
            throw new Error(`No data found at "${path}"!`); /* If no pandata found */

        /* If pandata found */
        const tab = filter.sort((a, b) => a.localeCompare(b));
        const obj: JSON_DEFAULT_TYPE = {};
        for (let t = 0; t < tab.length; t++) {
            const targ = tab[t];
            obj[targ] = jsonData[targ];
        }

        /* Build JSON Object from paths */
        const reversed = reverseTopLevelJsonFunc({ data: obj });
        if (!reversed.ok)
            throw new Error(reversed.log);

        /* Get pandata */
        let pandata: any = reversed.data;
        const pathTab = path.split('.');
        for (let d = 0; d < pathTab.length; d++) {
            const typ = getRealTypeFunc(pandata).type;
            const kdx = pathTab[d];
            switch (typ) {
                case 'json': { pandata = pandata[kdx] } break;

                case 'array': {
                    const idxTab = kdx.replaceAll('[', '').replaceAll(']', '').split('_');
                    for (let b = 0; b < idxTab.length; b++) {
                        const idx = Number(idxTab[b]);
                        pandata = pandata[idx];
                    }
                } break;

                default: { };
            };
        }

        /* - */
        res.data = pandata;

    } catch (e: any) {
        res.ok = false; res.log = e.message;
        logFunc(`Err :: extractPandataFromPathFunc() => ${e.message}`);
    }
    return res;
};

/** Parse Function */
const parseFunctionFunc = (func: string): Function | string => {
    const fidx = func.indexOf('{') + 1;
    const lidx = func.lastIndexOf('}]');

    if (fidx < 0 || lidx < 0)
        return func;

    const fn = func.slice(fidx, lidx).trim();
    const newFunc = new Function(fn);
    return newFunc;
};

/** String (keys) Interpolation • x.json (TLV) */
const interpolateFunc = (x: { json: JSON_DEFAULT_TYPE, deps: string[] }) => {
    const jsonData = x.json;
    const deps = x.deps;

    const interopCollector: JSON_DEFAULT_TYPE = {};
    let hasInterpolation = false;

    /* If deps exists, then extract interpolatable strings */
    if (deps.length > 0) {
        const skeys = Object.keys(jsonData); /* Extract all keys from the simplified JSON object */
        for (let k = 0; k < skeys.length; k++) {
            const ckey = skeys[k]; /* Current key */

            if (!ckey.includes('%')) continue; /* Jump to the next key if the current one isn't relevant */
            hasInterpolation = true;

            const tab = [...ckey.split(''), 'z']; /* The "z" ensure that the last interpolatable string is processed, by adding an additional loop */
            const blockList: string[] = [];
            let interopString: string = '';

            for (let i = 0; i < tab.length; i++) {
                const targ = tab[i];
                const convert = parseInt(targ);
                const isNumber = !isNaN(convert);
                if (!isNumber) {
                    if (targ !== '%' && interopString.length > 0) {
                        /* - */
                        if (blockList.includes(interopString)) continue;

                        /* Get the corresponding dependencie's value */
                        const nb = Number(interopString.replace('%', ''));
                        const depVal = deps[nb];
                        if (!depVal) throw new Error(`Invalid value for "%${nb}"`);

                        /* Store the interpolatable key and its corresponding dep's value */
                        interopCollector[interopString] = depVal;

                        /* - */
                        blockList.push(interopString);
                        interopString = '';

                    } else if (targ === '%') interopString = interopString + targ;

                } else {
                    if (interopString.length === 0) continue;
                    interopString = interopString + targ;
                }
            }
        }
    }

    /* Proceed to the interpolation */
    let newObj: JSON_DEFAULT_TYPE = {};
    if (hasInterpolation)
        for (let key in jsonData) {
            const val = jsonData[key];
            let newKey: string = key;
            for (let interop in interopCollector)
                if (newKey.includes(interop)) newKey = newKey.replaceAll(interop, interopCollector[interop]);
            newObj[newKey] = val;
        }
    else newObj = jsonData;

    /* - */
    return newObj;
};

/** Get path level */
const getPathLevelFunc = (x: { path: string }): number => {
    const path = x.path;
    let level = 0;
    const tab = path.split('.');
    for (let i = 0; i < tab.length; i++) {
        const path = tab[i];
        const isJson = getPathTypeFunc(path) === 'json';
        if (isJson) level++;
    }
    return level - 1;
};

/** Order path by level */
const orderPathByLevelFunc = (x: { json: JSON_DEFAULT_TYPE }): { level: number, data: JSON_DEFAULT_TYPE }[] => {
    const jsonData = x.json;

    /* - */
    const collector: { [key: string]: string[] } = {};
    for (let path in jsonData) {
        const lvl = String(getPathLevelFunc({ path }));
        if (!hasPropertyFunc(collector, lvl))
            collector[lvl] = [];
        collector[lvl].push(path);
    }

    /* - */
    const tab = [];
    const keys = Object.keys(collector).sort((a, b) => a.localeCompare(b));
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const val = collector[k];
        const dat: any = { level: Number(k), data: {} };
        for (let v = 0; v < val.length; v++) {
            const paf = val[v];
            dat.data[paf] = jsonData[paf];
        }
        tab.push(dat);
    }

    /* - */
    return tab;
};

/*
*
*
* 
* 
* 
* 
*/

/** 
* Transform the JSON Object into top-level keys only 
* Don't specify a value for "arr", it's used for recursive ops only 
*/
const topLevelJsonFunc = (x: { data: JSON_DEFAULT_TYPE, skipPathFormatting?: boolean, arr?: string[] }): FUNCTION_DEFAULT_RETURN_TYPE => {
    let res: FUNCTION_DEFAULT_RETURN_TYPE = { ok: true, log: '', data: undefined };
    try {
        const data = x.data;
        const skipPathFormatting = x.skipPathFormatting || false;

        let collector: JSON_DEFAULT_TYPE = {};
        const dtyp = getRealTypeFunc(data).type;

        /* - */
        if (dtyp === 'json')
            for (let key in data) {
                const val = data[key];
                const tab: string[] = !x.arr ? [] : [...x.arr]; /* Very sensitive! Should remain like this. */

                const typ = getRealTypeFunc(val).type;
                tab.push(key);

                /* - */
                switch (typ) {
                    case 'json': {
                        const recurse = topLevelJsonFunc({ data: val, skipPathFormatting, arr: tab });
                        if (!recurse.ok)
                            throw new Error(recurse.log);
                        Object.assign(collector, recurse.data);
                    } break;

                    case 'array': {
                        for (let i = 0; i < val.length; i++) {
                            const entry = val[i];
                            const getType = getRealTypeFunc(entry);

                            const etyp = getType.type;
                            if (!getType.valid)
                                throw Error(`Invalid type ("${etyp}") found!`);
                            const idx = `[${i}]`;

                            /* - */
                            if (['json', 'array'].includes(etyp)) {
                                const recurse = topLevelJsonFunc({ data: entry, skipPathFormatting, arr: [...tab, idx] });
                                if (!recurse.ok)
                                    throw new Error(recurse.log);
                                Object.assign(collector, recurse.data);

                            } else {
                                const pf = [...tab, idx].join('.');
                                const ky = skipPathFormatting ? pf.replaceAll('].[', '][') : formatPathFunc({ path: pf });
                                collector[ky] = val[i];
                            }
                        }
                    } break;

                    default: {
                        const pf = tab.join('.');
                        const ky = skipPathFormatting ? pf.replaceAll('].[', '][') : formatPathFunc({ path: pf });
                        collector[ky] = val;
                    };
                };
            }
        else if (dtyp === 'array') {
            const tab: string[] = !x.arr ? [] : [...x.arr]; /* Very sensitive! Should remain like this. */
            for (let i = 0; i < data.length; i++) {
                const entry = data[i];
                const getType = getRealTypeFunc(entry);

                const etyp = getType.type;
                if (!getType.valid)
                    throw new Error(`Invalid type ("${etyp}") found!`);
                const idx = `[${i}]`;

                /* - */
                if (['json', 'array'].includes(etyp)) {
                    const recurse = topLevelJsonFunc({ data: entry, skipPathFormatting, arr: [...tab, idx] });
                    if (!recurse.ok)
                        throw new Error(recurse.log);
                    Object.assign(collector, recurse.data);

                } else {
                    const pf = [...tab, idx].join('.');
                    const ky = skipPathFormatting ? pf.replaceAll('].[', '][') : formatPathFunc({ path: pf });
                    collector[ky] = data[i];
                }
            }
        }

        /* - */
        res.data = collector;

    } catch (e: any) {
        res.ok = false; res.log = e.message;
        logFunc(`Err :: topLevelJsonFunc() => ${e.message}`);
    }
    return res;
};

/** Reverse "topLevelJsonFunc" */
const reverseTopLevelJsonFunc = (x: { data: JSON_DEFAULT_TYPE }): FUNCTION_DEFAULT_RETURN_TYPE => {
    let res: FUNCTION_DEFAULT_RETURN_TYPE = { ok: true, log: '', data: undefined };
    try {
        /* 
        * Purge 
        * When a path with a value of type array or json is overwritted, then clear any other depending paths in order to apply the update safely
        */
        const jsonData = x.data;
        const array = Object.keys(jsonData);
        const flt = array.filter((e) => ['array', 'json'].includes(getRealTypeFunc(jsonData[e]).type));
        for (let i = 0; i < flt.length; i++) {
            const paf = flt[i];
            const todelete = array.filter((e) =>
                e.includes(paf) &&
                e.indexOf(paf) === 0 &&
                e.length > paf.length
            );
            if (todelete.length > 0)
                for (let t = 0; t < todelete.length; t++) {
                    const k = todelete[t];
                    delete jsonData[k];
                }
        }

        /* - */
        const data = jsonData;
        const allKeys = Object.keys(data).sort((a, b) => a.localeCompare(b));
        const collector: JSON_DEFAULT_TYPE = {};

        /* Extract first column keys */
        const firstColumnKeys: JSON_DEFAULT_TYPE = {};
        for (let k in data) {
            const firstColumnKeyName = k.split('.')[0];
            firstColumnKeys[firstColumnKeyName] = firstColumnKeyName;
        }

        /* For each top-level key, extract all keys containing it */
        const topLevelKeys: { [keys: string]: string[] } = {};
        const tab = Object.keys(firstColumnKeys);
        for (let i = 0; i < tab.length; i++) {
            /* Extract keys */
            const target = tab[i];
            const keysTab = allKeys.filter((e) => e.includes(target) && e.indexOf(target) === 0);
            topLevelKeys[target] = keysTab;

            /* Set 'top-level' keys inside the collector */
            const path = keysTab[0].split('.')[1] || undefined;
            if (path) { /* Process top-level keys that are objects */
                const topLevelKeyType = getPathTypeFunc(path);
                collector[target] = (topLevelKeyType === 'json') ? {} : [];

            } else { /* Process top-level keys that are not objects */
                collector[target] = data[target];
                delete topLevelKeys[target]; /* Remove the top-level key as its processing is finished */
            }
        }

        /* Build array for top-level keys with a value of type array */
        for (let k in collector) {
            /* Skip non-array values */
            if (getRealTypeFunc(collector[k]).type !== 'array')
                continue;
            /* Build array from index pattern */
            const ktab = topLevelKeys[k];
            const flt = ktab.filter((e) => e.includes(k) && e.indexOf(k) === 0);
            collector[k] = buildArrayFromIndexPatternFunc({ patchChain: flt, pathIndex: 1 });
        }

        /* Get longest path length */
        const lenObj: JSON_DEFAULT_TYPE = {};
        let arr: number[] = [];
        for (let n = 0; n < allKeys.length; n++) {
            const ktab = allKeys[n].split('.');
            lenObj[ktab.length] = ktab.length;
        }
        arr = Object.values(lenObj);
        const longestPathLength = arr.sort((a, b) => b - a)[0];

        /* Process the paths of each top-level key */
        let processedPathChain: JSON_DEFAULT_TYPE = {};
        for (let k in topLevelKeys) {
            const keysTab = topLevelKeys[k];
            let pathIndex = 1;
            do {
                for (let i = 0; i < keysTab.length; i++) {
                    const ckey = keysTab[i]; /* current key */
                    const pathTab = ckey.split('.');

                    /* Get path chain */
                    let pathChain = '';
                    for (let p = 0; p <= pathIndex; p++)
                        pathChain = pathChain + (pathChain.length > 0 ? '.' : '') + pathTab[p];

                    /* - */
                    const filter = keysTab.filter((e) => e.includes(pathChain) && e.indexOf(pathChain) === 0);
                    if (filter.length === 0) continue;
                    filter.sort((a, b) => a.localeCompare(b));

                    /* - */
                    if (!hasPropertyFunc(processedPathChain, pathChain)) {
                        const split = filter[0].split('.');
                        const nextPath = split[pathIndex + 1];

                        const pathChain = split.join('.');
                        const value = data[pathChain];

                        if (nextPath)
                            switch (getPathTypeFunc(nextPath)) {
                                case 'json': { jsonAppendDataFunc({ sourceObj: collector, pathChain, data: value }) } break;

                                case 'array': { jsonAppendDataFunc({ sourceObj: collector, pathChain, data: value, filter }) } break;

                                default: { };
                            }
                        else jsonAppendDataFunc({ sourceObj: collector, pathChain, data: value });
                    }

                    /* Exclude current "pathChain" from next loops */
                    processedPathChain[pathChain] = pathChain;
                }

                /* Increment "pathIndex" */
                pathIndex++;

            } while (pathIndex < longestPathLength);
        }

        /* - */
        res.data = collector;

    } catch (e: any) {
        res.ok = false; res.log = e.message;
        logFunc(`Err :: reverseTopLevelJsonFunc() => ${e.message}`);
    }
    return res;
};

/*
*
*
* 
* 
* 
* 
*/

/** Get */
const getFunc = (x: { json: JSON_DEFAULT_TYPE, path: GET_ARG_PATH_TYPE }): any => {
    const res: FUNCTION_DEFAULT_RETURN_TYPE = { ok: true, log: '', data: undefined };
    const scopeId = generateIdFunc();
    try {
        /* - */
        const jsonData = x.json;
        const path = x.path;

        /* - */
        if (isEmptyFunc({ json: jsonData }))
            return undefined;

        /* TLV */
        const tlv = topLevelJsonFunc({ data: jsonData });
        if (!tlv.ok)
            throw new Error(tlv.log);

        /* - */
        scopeDATA.current[scopeId] = {
            id: scopeId,
            data: tlv.data
        };

        /* - */
        const dataType = getRealTypeFunc(path).type;
        const cachedPandata: JSON_DEFAULT_TYPE = {}; /* Fetched pandata cache */

        /* - */
        switch (dataType) {
            case 'string': {
                const paf = resolvePathFunc({ scopeId, path: path as string });
                const val = extractPandataFromPathFunc({ scopeId, path: paf });
                const v = !val.ok ? undefined : val.data;
                cachedPandata[paf] = v;
                res.data = v;
            } break;

            case 'array': {
                const pafTab = path as string[];
                const arr: any[] = [];

                /* Fetch pandata for each path */
                for (let i = 0; i < pafTab.length; i++) {
                    const currentPath = resolvePathFunc({ scopeId, path: pafTab[i] });
                    if (!hasPropertyFunc(cachedPandata, currentPath)) {
                        const val = extractPandataFromPathFunc({ scopeId, path: currentPath });
                        const v = !val.ok ? undefined : val.data;
                        arr.push(v);
                        cachedPandata[currentPath] = v;

                    } else arr.push(cachedPandata[currentPath]); /* Use cached pandata */
                }

                /* - */
                res.data = arr;
            } break;

            case 'json': {
                const pafKey = Object.keys(path);
                const obj: JSON_DEFAULT_TYPE = {};

                /* Fetch pandata for each path  */
                for (let i = 0; i < pafKey.length; i++) {
                    const ckey = pafKey[i];
                    const currentPath = resolvePathFunc({ scopeId, path: (path as JSON_DEFAULT_TYPE)[ckey] });
                    if (!hasPropertyFunc(cachedPandata, currentPath)) {
                        const val = extractPandataFromPathFunc({ scopeId, path: currentPath });
                        const v = !val.ok ? undefined : val.data;
                        obj[ckey] = v;
                        cachedPandata[currentPath] = v;

                    } else obj[ckey] = cachedPandata[currentPath]; /* Use cached pandata */
                }

                /* - */
                res.data = obj;
            } break;

            default: { throw new Error(`Invalid path!`) };
        };

    } catch (e: any) {
        res.ok = false; res.log = e.message;
        plogFunc('⛔️ Err [oh-my-json] :: getFunc() =>', e.message);
    }

    /* Clear scope */
    delete scopeDATA.current[scopeId];

    /* - */
    return res.data;
};

/** Update */
const updateFunc = (x: { json: JSON_DEFAULT_TYPE, updates: JSON_DEFAULT_TYPE }): JSON_DEFAULT_TYPE | undefined => {
    const scopeId = generateIdFunc();
    try {
        const jsonData = x.json;
        const updates = x.updates;

        /* - */
        if (isEmptyFunc({ json: jsonData })) return {};
        if (isEmptyFunc({ json: updates })) return jsonData;

        /* TLV */
        const tlv = topLevelJsonFunc({ data: jsonData });
        if (!tlv.ok)
            throw new Error(tlv.log);
        const data: JSON_DEFAULT_TYPE = tlv.data;

        /* - */
        scopeDATA.current[scopeId] = { id: scopeId, data };

        /* Resolve paths */
        const newUpdates: JSON_DEFAULT_TYPE = {};
        for (let path in updates) {
            const val = updates[path];
            const ky = resolvePathFunc({ scopeId, path });
            newUpdates[ky] = val;
        }

        /* Run "functional mutations" */
        for (let path in newUpdates) {
            const val = newUpdates[path];
            if (typeof val !== 'function')
                continue;

            const xtract = extractPandataFromPathFunc({ scopeId, path });
            if (!xtract.ok)
                throw new Error(xtract.log);

            const currentVal = xtract.data;
            const func = val as Function;
            if (getFunctionTypeFunc(func) === 'async')
                throw new Error(`Async function found!`);

            const res = func(currentVal);
            newUpdates[path] = res;
        }

        /* Build */
        const newObj = Object.assign(data, newUpdates);
        const build = reverseTopLevelJsonFunc({ data: newObj });
        if (!build.ok)
            throw new Error(build.log);

        /* - */
        return build.data;

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: updateFunc() =>', e.message);
        return undefined;
    }
};

/** Delete */
const deleteFunc = (x: { json: JSON_DEFAULT_TYPE, path: DELETE_ARG_PATH_TYPE }): JSON_DEFAULT_TYPE | undefined => {
    const scopeId = generateIdFunc();
    try {
        const jsonData = x.json;
        const path = Array.isArray(x.path) ? x.path : [x.path];

        /* - */
        if (isEmptyFunc({ json: jsonData }))
            return {};

        /* TLV */
        const tlv = topLevelJsonFunc({ data: jsonData });
        if (!tlv.ok)
            throw new Error(tlv.log);
        const data = tlv.data;

        /* - */
        scopeDATA.current[scopeId] = { id: scopeId, data };

        /* Delete each path */
        const keys = Object.keys(data);
        for (let i = 0; i < path.length; i++) {
            let currentPath = path[i];
            currentPath = resolvePathFunc({ scopeId, path: currentPath });

            /* - */
            const filter = keys.filter((e) => e.includes(currentPath) && e.indexOf(currentPath) === 0);
            if (filter.length === 0)
                continue;
            for (let m = 0; m < filter.length; m++) {
                const path = filter[m];
                delete data[path];
            }
        }

        /* Clear scope */
        delete scopeDATA.current[scopeId];

        /* Build */
        const build = reverseTopLevelJsonFunc({ data });
        if (!build.ok)
            throw new Error(build.log);

        /* - */
        return build.data;

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: deleteFunc() =>', e.message);
        delete scopeDATA.current[scopeId];
        return undefined;
    }
};

/** Sort */
const sortFunc = (x: { json: JSON_DEFAULT_TYPE, order?: 'asc' | 'desc' }): JSON_DEFAULT_TYPE | undefined => {
    try {
        const jsonData = x.json;
        const order = x.order || 'asc';

        /* - */
        const tab = Object.keys(jsonData);
        if (tab.length === 0)
            return {};

        /* - */
        const obj: JSON_DEFAULT_TYPE = {};
        const keys = tab.sort((a, b) => order === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
        for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            obj[k] = jsonData[k];
        }

        /* - */
        return obj;

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: sortFunc() =>', e.message);
        return undefined;
    }
};

/** Merge */
const mergeFunc = (x: { array: JSON_DEFAULT_TYPE[], deps?: string[] }): JSON_DEFAULT_TYPE | undefined => {
    try {
        const jsonData = x.array;
        const deps = x.deps || [];

        /* - */
        if (jsonData.length === 0) return {};
        if (jsonData.length === 1) return jsonData[0];

        /* - */
        const collector: JSON_DEFAULT_TYPE = {};
        for (let i = 0; i < jsonData.length; i++) {
            const current = jsonData[i];

            /* -*/
            if (isEmptyFunc({ json: jsonData }))
                continue;

            /* TLV */
            const tlv = topLevelJsonFunc({ data: current });
            if (!tlv.ok)
                throw new Error(tlv.log);
            const data = tlv.data;

            /* Interpolation */
            let newObj = data;
            if (deps.length > 0)
                newObj = interpolateFunc({ json: data, deps });

            /* - */
            Object.assign(collector, newObj);
        }

        /* Sort collector */
        const newCollector: JSON_DEFAULT_TYPE = {};
        const keys = Object.keys(collector).sort((a, b) => a.localeCompare(b));
        for (let j = 0; j < keys.length; j++) {
            const targ = keys[j];
            newCollector[targ] = collector[targ];
        }

        /* Build */
        const build = reverseTopLevelJsonFunc({ data: newCollector });
        if (!build.ok)
            throw new Error(build.log);

        /* - */
        return build.data;

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: mergeFunc() =>', e.message);
        return undefined;
    }
};

/** Clone */
const cloneFunc = (x: { json: JSON_DEFAULT_TYPE, preserve?: string | string[] }): JSON_DEFAULT_TYPE | undefined => {
    try {
        const jsonData = x.json;
        const preserve = x.preserve;
        let res = {};

        /* - */
        if (isEmptyFunc({ json: jsonData }))
            return {};

        /* - */
        if (preserve)
            res = cloneJSONFunc(jsonData, preserve);
        else {
            /* Try "structuredClone" */
            const sclone = structuredCloneFunc(jsonData);
            if (sclone !== undefined)
                return sclone;

            /* - */
            res = cloneJSONFunc(jsonData, preserve);
        }

        /* - */
        return res;

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: cloneFunc() =>', e.message);
        return undefined;
    }
};

/** Decompose */
const decomposeFunc = (x: { json: JSON_DEFAULT_TYPE }): JSON_DEFAULT_TYPE | undefined => {
    const scopeId = generateIdFunc();
    try {
        const jsonData = x.json;

        /* - */
        if (isEmptyFunc({ json: jsonData }))
            return {};

        /* TLV */
        const tlv = topLevelJsonFunc({ data: jsonData });
        if (!tlv.ok)
            throw new Error(tlv.log);
        const data: JSON_DEFAULT_TYPE = tlv.data;

        /* - */
        scopeDATA.current[scopeId] = { id: scopeId, data };

        /* - */
        const keys = getKeysFunc({ json: jsonData, level: -1 });
        if (keys === undefined)
            throw new Error(`Impossible to get keys!`);
        const collector: JSON_DEFAULT_TYPE = {};
        for (let i = 0; i < keys.length; i++) {
            const path = keys[i];
            const val = extractPandataFromPathFunc({ scopeId, path }).data;
            const paf = path.replaceAll('].[', '][');
            collector[paf] = val;
        }

        /* Clear scope */
        delete scopeDATA.current[scopeId];

        /* - */
        return collector;

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: decomposeFunc() =>', e.message);
        delete scopeDATA.current[scopeId];
        return undefined;
    }
};

/** Simplify */
const simplifyFunc = (x: { json: JSON_DEFAULT_TYPE, sort?: 'asc' | 'desc' }): JSON_DEFAULT_TYPE | undefined => {
    try {
        const jsonData = x.json;
        const sort = x.sort;

        /* - */
        if (isEmptyFunc({ json: jsonData }))
            return {};

        /* TLV */
        const tlv = topLevelJsonFunc({ data: x.json, skipPathFormatting: true });
        if (!tlv.ok)
            throw new Error(tlv.log);

        /* Sort */
        let obj = tlv.data;
        if (sort) obj = sortFunc({ json: tlv.data, order: sort });

        /* - */
        return obj;

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: simplifyFunc() =>', e.message);
        return undefined;
    }
};

/** Build */
const buildFunc = (x: { json: JSON_DEFAULT_TYPE, deps?: string[] }): JSON_DEFAULT_TYPE | undefined => {
    try {
        const jsonData = x.json;
        const deps = x.deps || [];

        /* - */
        if (isEmptyFunc({ json: jsonData }))
            return {};

        /* TLV */
        const tlv = topLevelJsonFunc({ data: jsonData });
        if (!tlv.ok)
            throw new Error(tlv.log);
        const data = tlv.data;

        /* Interpolation */
        let newObj = data;
        if (deps.length > 0)
            newObj = interpolateFunc({ json: data, deps });

        /* Build */
        const build = reverseTopLevelJsonFunc({ data: newObj });
        if (!build.ok)
            throw new Error(build.log);

        /* - */
        return build.data;

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: buildFunc() =>', e.message);
        return undefined;
    }
};

/** Get keys */
const getKeysFunc = (x: { json: JSON_DEFAULT_TYPE, level?: number }): string[] | undefined => {
    try {
        const jsonData = x.json;
        const level = x.level || 0;

        /* Get top-level keys */
        if (level === 0)
            return Object.keys(jsonData);

        /* Get all-level keys and indexes */
        else if (level === -1) {
            const tlv = topLevelJsonFunc({ data: jsonData, skipPathFormatting: true });
            const keys = Object.keys(tlv.data);
            const collector: JSON_DEFAULT_TYPE = {};
            for (let i = 0; i < keys.length; i++) {
                const pathChain = keys[i].replaceAll('][', '].[');
                const split = pathChain.split('.');
                const tab: string[] = [];
                for (let m = 0; m < split.length; m++) {
                    const targ = split[m];
                    tab.push(targ);
                    const paf = tab.join('.');
                    collector[paf] = paf;
                }
            }
            return Object.values(collector).sort((a, b) => a.localeCompare(b));
        }

        /* Get nested level keys */
        else if (level > 0) {
            const tlv = topLevelJsonFunc({ data: jsonData, skipPathFormatting: true });
            const keys = Object.keys(tlv.data);
            const filter = keys.filter((e) => {
                const len = e.split('.').length;
                return len > level;
            });

            /* - */
            const collector: JSON_STRING_TYPE = {};
            for (let i = 0; i < filter.length; i++) {
                const pathChain = filter[i];
                const tab = pathChain.split('.');
                const arr: string[] = [];
                let validKeyLen = 0;

                /* - */
                for (let t = 0; t < tab.length; t++) {
                    const cpath = tab[t];
                    const typ = getPathTypeFunc(cpath);
                    if (validKeyLen === level + 1) break;
                    arr.push(cpath);
                    if (typ === 'json') validKeyLen++;
                }

                /* - */
                if (validKeyLen !== level + 1) continue;

                /* - */
                const paf = arr.join('.');
                collector[paf] = paf;
            }

            /* - */
            const res = Object.values(collector).sort((a, b) => a.localeCompare(b));
            return res;
        }

        /* - */
        else
            return [];

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: getKeysFunc() =>', e.message);
        return undefined;
    }
};

/** Get values */
const getValuesFunc = (x: { json: JSON_DEFAULT_TYPE, level?: number }): string[] | undefined => {
    const scopeId = generateIdFunc();
    try {
        const jsonData = x.json;

        /* - */
        if (isEmptyFunc({ json: jsonData }))
            return [];

        /* TLV */
        const tlv = topLevelJsonFunc({ data: jsonData });
        if (!tlv.ok)
            throw new Error(tlv.log);
        const data: JSON_DEFAULT_TYPE = tlv.data;

        /* - */
        scopeDATA.current[scopeId] = { id: scopeId, data };

        /* - */
        const keys = getKeysFunc(x);
        if (keys === undefined)
            throw new Error(`Impossible to get keys!`);
        const collector: JSON_DEFAULT_TYPE = {};
        for (let i = 0; i < keys.length; i++) {
            const path = keys[i];
            collector[path] = extractPandataFromPathFunc({ scopeId, path }).data;
        }

        /* Clear scope */
        delete scopeDATA.current[scopeId];

        /* - */
        const res = Object.values(collector);
        return res;

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: getValuesFunc() =>', e.message);
        delete scopeDATA.current[scopeId];
        return undefined;
    }
};

/** Stringify */
const stringifyFunc = (x: { json: JSON_DEFAULT_TYPE, includeFunctions?: boolean }): string | undefined => {
    try {
        const jsonData = x.json;
        const includeFunctions = x.includeFunctions || false;

        /* - */
        if (isEmptyFunc({ json: jsonData }))
            return '';

        /* TLV */
        const tlv = topLevelJsonFunc({ data: jsonData });
        if (!tlv.ok)
            throw new Error(tlv.log);
        const data = tlv.data;

        /* Stringify functions */
        for (let k in data) {
            const val = data[k];
            switch (typeof val) {
                case 'undefined': {
                    data[k] = '%undefined%';
                } break;

                case 'function': {
                    const func = val as Function;
                    const ftyp = getFunctionTypeFunc(func);
                    const fn = (func.toString()).trim().replaceAll('"', '\'');
                    data[k] = includeFunctions ? `[Function(${ftyp}): ${fn}]` : `[Function(${ftyp}): ${func.name || 'anonymous'}]`;
                } break;

                default: { continue };
            }
        }

        /* Build */
        const build = reverseTopLevelJsonFunc({ data });
        if (!build.ok)
            throw new Error(build.log);

        /* - */
        const res = JSON.stringify(build.data, null, 2);
        return res;

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: stringifyFunc() =>', e.message);
        return undefined;
    }
};

/** Parse */
const parseFunc = (x: { text: string }): JSON_DEFAULT_TYPE | undefined => {
    try {
        const text = x.text;
        const jsonData = JSON.parse(text);

        /* TLV */
        const tlv = topLevelJsonFunc({ data: jsonData });
        if (!tlv.ok)
            throw new Error(tlv.log);
        const data = tlv.data;

        /* - */
        for (let k in data) {
            const val = data[k];

            if (typeof val !== 'string')
                continue;

            const typ =
                val === '%undefined%' ?
                    'undefined' :
                    val.indexOf('[Function(') === 0 ?
                        'function' : undefined;

            /* - */
            switch (typ) {
                case 'undefined': {
                    data[k] = undefined;
                } break;

                case 'function': {
                    data[k] = parseFunctionFunc(val);
                } break;

                default: { continue };
            };
        }

        /* Build */
        const build = reverseTopLevelJsonFunc({ data });
        if (!build.ok)
            throw new Error(build.log);

        /* - */
        return build.data;

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: parseFunc() =>', e.message);
        return undefined;
    }
};

/** Is empty */
const isEmptyFunc = (x: { json: JSON_DEFAULT_TYPE }): boolean => Object.keys(x.json).length === 0;

/** Exists */
const existsFunc = (x: { json: JSON_DEFAULT_TYPE, path: string | string[] | JSON_STRING_TYPE }): EXISTS_RETURN_TYPE => {
    const jsonData = x.json;
    const path = x.path;
    let res: any = false;
    const typ = getRealTypeFunc(path).type;

    /* - */
    const checkSubFunc = (x: { path: string, scopeId?: string }): boolean => {
        const pf = x.path;
        const scopeId = x.scopeId;
        const key = extractMainKeyFunc(pf);
        const isTopLevelPath = !pf.includes('.');

        /* - */
        let exists = false;
        if (isTopLevelPath)
            exists = hasPropertyFunc(jsonData, key);
        else {
            let paf = resolvePathFunc({ scopeId: scopeId!, path: pf });
            const tab = paf.split('.');
            const lastPathType = getPathTypeFunc(tab[tab.length - 1]);
            if (lastPathType === 'array')
                return false;
            tab.pop();
            paf = tab.join('.');
            const xtract = extractDataFunc({ json: jsonData, path: paf });
            exists = hasPropertyFunc(xtract, key);
        }

        /* - */
        return exists;
    };

    /* TLV */
    const tlv = topLevelJsonFunc({ data: jsonData });
    if (!tlv.ok) {
        plogFunc('⛔️ Err [oh-my-json] :: existsFunc() =>', tlv.log);
        throw new Error(tlv.log);
    }
    const data = tlv.data;

    /* - */
    const scopeId = generateIdFunc();
    scopeDATA.current[scopeId] = { id: scopeId, data };

    /* - */
    switch (typ) {
        case 'string': {
            const paf = path as string;
            res = checkSubFunc({ path: paf, scopeId });
        } break;

        case 'array': {
            let collector: boolean[] = [];
            const tab = path as string[];
            for (let i = 0; i < tab.length; i++) {
                const paf = tab[i];
                const val = checkSubFunc({ path: paf, scopeId });
                collector.push(val);
            }
            res = collector;
        } break;

        case 'json': {
            let collector: JSON_BOOLEAN_TYPE = {};
            const obj = path as JSON_STRING_TYPE;
            for (let k in obj) {
                const paf = obj[k];
                const val = checkSubFunc({ path: paf, scopeId });
                collector[k] = val;
            }
            res = collector;
        } break;

        default: { };
    };

    /* Clear scope */
    delete scopeDATA.current[scopeId];

    /* - */
    return res;
};

/** Depth */
const getDepthFunc = (x: { json: JSON_DEFAULT_TYPE }): number => {
    try {
        const jsonData = x.json;
        let depth = 0;

        /* - */
        if (isEmptyFunc({ json: jsonData }))
            return 0;

        /* TLV */
        const tlv = topLevelJsonFunc({ data: jsonData });
        if (!tlv.ok)
            throw new Error(tlv.log);
        const data: JSON_DEFAULT_TYPE = tlv.data;

        /* Get longest path */
        const paths = Object.keys(data);
        let longestPath = '';
        for (let l = 0; l < paths.length; l++) {
            const paf = paths[l];
            if (paf.length > longestPath.length) longestPath = paf;
        }

        /* Get depth */
        const tab = longestPath.split('.');
        for (let i = 0; i < tab.length; i++) {
            const paf = tab[i];
            const isArr = getPathTypeFunc(paf) === 'array';
            if (isArr)
                continue; /* Skip array indexes */
            depth++;
        }

        /* - */
        return depth;

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: getDepthFunc() =>', e.message);
        return -1;
    }
};

/** Iterate */
const iterateFunc = (x: { json: JSON_DEFAULT_TYPE, forEach: ITERATE_ARG_FOREACH_TYPE, path?: string, level?: number }): void => {
    const scopeId = generateIdFunc();
    try {
        const jsonData = x.json;
        const forEach = x.forEach;
        const path = x.path;
        const level = x.level ?? 0;

        /* - */
        if (isEmptyFunc({ json: jsonData }))
            return;

        /* TLV */
        const tlv = topLevelJsonFunc({ data: jsonData });
        if (!tlv.ok)
            throw new Error(tlv.log);
        const data = tlv.data;

        /* - */
        scopeDATA.current[scopeId] = { id: scopeId, data };

        /* - */
        const iteratorSubFunc = (jdata: JSON_DEFAULT_TYPE, ilevel?: number) => {
            /* - */
            const decomp = decomposeFunc({ json: jdata });
            if (decomp === undefined)
                throw new Error(`Impossible to get keys!`);
            const arr = orderPathByLevelFunc({ json: decomp });

            /* - */
            for (let i = 0; i < arr.length; i++) {
                const targ = arr[i];
                const lvl = targ.level; /* level */
                if (ilevel !== undefined && lvl !== ilevel)
                    continue;
                const obj = targ.data;

                /* - */
                for (let k in obj) {
                    const pf = k; /* path */
                    const ky = (k.split('.').reverse())[0]; /* key */
                    const vl = obj[k]; /* value */

                    /* - */
                    try { forEach(lvl, pf, ky, vl) }
                    catch (e: any) { };
                }
            }
        };

        /* - */
        let preference: 'path' | 'level' | undefined | null = undefined;
        if (path)
            preference = 'path';
        else if (typeof level === 'number')
            preference = (level === -1) ? undefined : (level >= 0) ? 'level' : null;
        if (preference === null)
            return;

        /* - */
        switch (preference) {
            case 'path': {
                const paf = resolvePathFunc({ scopeId, path: path! });
                const extract = extractPandataFromPathFunc({ scopeId, path: paf });
                if (!extract.ok)
                    throw new Error(extract.log);
                iteratorSubFunc(extract.data);
            } break;

            case 'level': {
                if (level === undefined || level < 0)
                    return;
                iteratorSubFunc(jsonData, level);
            } break;

            default: { iteratorSubFunc(jsonData) };
        };

        /* Clear scope */
        delete scopeDATA.current[scopeId];

    } catch (e: any) {
        plogFunc('⛔️ Err [oh-my-json] :: iterateFunc() =>', e.message);
        delete scopeDATA.current[scopeId];
        return;
    }
};

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ---------------------------------------------- oh-my-json ---------------------------------------------- */

const jzon: MAIN_TYPE = {
    init(): OH_MY_JSON_TYPE {
        const next = {
            /* get */
            get(json: JSON_DEFAULT_TYPE, path: GET_ARG_PATH_TYPE): any {
                const data = getFunc({ json, path });
                return data;
            },

            /* update */
            update(json: JSON_DEFAULT_TYPE, updates: JSON_DEFAULT_TYPE): JSON_DEFAULT_TYPE | undefined {
                const data = updateFunc({ json, updates });
                return data;
            },

            /* delete */
            delete(json: JSON_DEFAULT_TYPE, path: DELETE_ARG_PATH_TYPE): JSON_DEFAULT_TYPE | undefined {
                const data = deleteFunc({ json, path });
                return data;
            },

            /* sort */
            sort(json: JSON_DEFAULT_TYPE, order?: 'asc' | 'desc'): JSON_DEFAULT_TYPE | undefined {
                const data = sortFunc({ json, order });
                return data;
            },

            /* merge */
            merge(array: JSON_DEFAULT_TYPE[], deps?: string[]): JSON_DEFAULT_TYPE | undefined {
                const data = mergeFunc({ array, deps });
                return data;
            },

            /* clone */
            clone(json: JSON_DEFAULT_TYPE, preserve?: string | string[]): JSON_DEFAULT_TYPE | undefined {
                const data = cloneFunc({ json, preserve });
                return data;
            },

            /* decompose */
            decompose(json: JSON_DEFAULT_TYPE): JSON_DEFAULT_TYPE | undefined {
                const data = decomposeFunc({ json });
                return data;
            },

            /* simplify */
            simplify(json: JSON_DEFAULT_TYPE): JSON_DEFAULT_TYPE | undefined {
                const data = simplifyFunc({ json });
                return data;
            },

            /* build */
            build(json: JSON_DEFAULT_TYPE, deps?: string[]): JSON_DEFAULT_TYPE | undefined {
                const data = buildFunc({ json, deps });
                return data;
            },

            /* keys */
            keys(json: JSON_DEFAULT_TYPE, level?: number): string[] | undefined {
                const data = getKeysFunc({ json, level });
                return data;
            },

            /* values */
            values(json: JSON_DEFAULT_TYPE, level?: number): any[] | undefined {
                const data = getValuesFunc({ json, level });
                return data;
            },

            /* stringify */
            stringify(json: JSON_DEFAULT_TYPE, includeFunctions?: boolean): string | undefined {
                const data = stringifyFunc({ json, includeFunctions });
                return data;
            },

            /* parse */
            parse(text: string): JSON_DEFAULT_TYPE | undefined {
                const data = parseFunc({ text });
                return data;
            },

            /* Is empty */
            isEmpty(json: JSON_DEFAULT_TYPE): boolean {
                const data = isEmptyFunc({ json });
                return data;
            },

            /* Exists */
            exists(json: JSON_DEFAULT_TYPE, path: string | string[] | JSON_STRING_TYPE): EXISTS_RETURN_TYPE {
                const data = existsFunc({ json, path });
                return data;
            },

            /* Is empty */
            depth(json: JSON_DEFAULT_TYPE): number {
                const data = getDepthFunc({ json });
                return data;
            },

            /* Iterate */
            iterate(x: { json: JSON_DEFAULT_TYPE, forEach: ITERATE_ARG_FOREACH_TYPE, path?: string, level?: number }): void {
                iterateFunc(x);
            }
        };
        return next;
    }
};

const json = jzon.init();
export default json;

