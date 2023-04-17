const DEFAULT_PAGE_NUM = 1;
const DEFAULT_PAGE_LIMIT = 0; // 0 means all records to mongo 

function getPagination(query) {
    const page = Math.abs(query.page) || DEFAULT_PAGE_NUM;
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
    const skip = (page - 1) * limit; 

    return {
        skip, 
        limit
    }
}

module.exports = {
    getPagination
}