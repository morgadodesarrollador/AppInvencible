const multipart= require('connect-multiparty');
export const md_upload =  multipart({
    uploadDir: './uploads/users'
})



