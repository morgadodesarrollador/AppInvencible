import { IFileUpload } from '../interfaces/file-upload';
import path from 'path'; // de node
import fs from 'fs'; // tratamiento de archivos --> node
import uniqid from 'uniqid';
import { resolve } from 'dns';

// esta clase crealas carpetas de los usuarios con su id donde suben las imagenes
export default class CFileSystem {

    constructor() { }

    saveImageTemp( file: IFileUpload, idUser: string){ // retorna una PROMESA   

        return  new Promise( ( resolve, reject ) => {
             // nombre de carpeta
            
            const path = this.newFolderUser (idUser);
            //nombre de archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            // mover el fichero del espacio temporal al directorio /uploads
            // trabaja en base a callbacks no promesas. Necesitamos regresar una PROMESA 
            file.mv( `${ path }/${ nombreArchivo }`, (err: any) => { 
                if ( err ){
                    // no se pudo mover
                    reject (err); // lanzo el err fuera
                } else {
                    // todo ok
                    resolve(nombreArchivo);
                }
            } );  

        });
       

    }

    private generarNombreUnico( nombreOriginal: string ){ // entre el nombre del file. foto.jpg
        const nombreArr = nombreOriginal.split('.'); // segmentamos por .
        const extension = nombreArr[ nombreArr.length -1 ];
        const idUnico = uniqid();
        return `${ idUnico }.${ extension }` ;
    }

    private newFolderUser( idUser:  string){
        // __dirname : ruta del directorio clases
        // todo crea rutaServidor/uploads/idUsuario
        const pathUser = path.resolve ( __dirname, '../uploads/', idUser);
        const pathUserTmp = pathUser +'/tmp'; 
        console.log(pathUser);

        const existe = fs.existsSync(pathUser);
        if ( !existe ){
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTmp);
        }

        return pathUserTmp
    }

    public deleteFile (idUser:string, img: string) {
        return new Promise ((resolve, reject)=>{
            const pathUsers = path.resolve ( __dirname, '../uploads/', idUser, 'users');
            const ruta = `${ pathUsers }/${img}`;
            fs.unlink(ruta, (err: any) => {
                if (err) reject (err)
                resolve (true);
            });
        });
        
        
    }
    public moverImagenesTempaUsers( idUser: string ){
        const pathTmp = path.resolve ( __dirname, '../uploads/', idUser, 'tmp');
        const pathUsers = path.resolve ( __dirname, '../uploads/', idUser, 'users');

        if ( !fs.existsSync( pathTmp )){
            return [];
        }
        if ( !fs.existsSync( pathUsers )){ // existe tmp, y no users
            fs.mkdirSync( pathUsers );
        }
        const imagenesTmp = this.GetImagenesDir( idUser , 'tmp');

        imagenesTmp.forEach (imagen => {
            fs.renameSync(`${pathTmp}/${imagen }`, `${pathUsers}/${imagen }`);
        }); 

        return imagenesTmp;
    }

    public GetImagenesDir (idUser: string, folder: string ){
        const pathTmp = path.resolve ( __dirname, '../uploads/', idUser, folder);
        return fs.readdirSync (pathTmp) || [];
    }

    public getFotoUrl (userId: string,  img: string){

        const pathFoto = path.resolve( __dirname, '../uploads', userId, 'users', img);

        const existe = fs.existsSync (pathFoto);
        if (!existe){
            return path.resolve( __dirname, '../assets/400x250.jpg')
        }
        return pathFoto;
    }
}