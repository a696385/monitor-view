module.exports = {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // production //////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    production: {
        //
        // параметры 'swift.mvc'
        //
        swift: {
            //
            // параметры сервера
            //
            server: {
                //
                // ip-адрес сервера
                //
                ip: '127.0.0.1',
                //
                // порт сервера
                //
                port: '9080'
            },
            //
            // параметры менеджера логгеров
            //
            loggerManager: {
                //
                // список логгеров
                //
                loggers: {
                    //
                    // параметры логгера
                    //
                    error: {
                        //
                        // путь к лог-файлу
                        //
                        path: '../../logs/error.log',
                        //
                        // кодировка лог-файла
                        //
                        encoding: 'UTF-8',
                        //
                        // запретить запуск логгера (лог-файл не будет создан, поток записи не будет открыт,
                        // попытки логирования будут генерировать исключения)
                        //
                        stopped: false,
                        //
                        // деактивировать логгер (лог-файл будет создан, поток записи будет открыт,
                        // попытки логирования будут игнорироваться)
                        //
                        disabled: false
                    }
                }
            }
        },
        //
        // параметры приложения
        //
        application: {
            //
            // параметры сессий
            //
            session: {
                //
                // параметры хранилища сессий
                //
                memoryStore: {},
                //
                // секретная фраза для генерации имени куки
                //
                secret: 'A6-ZedUroagotFImLbJiAY',
                //
                // максимальное время жизни (ms)
                //
                maxAge: 24 * 60 * 60 * 1000
            },
            //
            // параметры кук
            //
            cookie: {
                //
                // максимальное время жизни (ms)
                //
                maxAge: 24 * 60 * 60 * 1000
            },
            //
            // время ожидания ответа приложения (ms)
            //
            timeout: 15000,
            //
            // директория сохранения загружаемых файлов (относительно app.js)
            //
            uploadDir: './uploads'
        }
    },
    //
    // production //////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // test ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    test: { $extends: 'production' },
    //
    // test ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // development /////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    development: { $extends: 'production'},
    //
    // development /////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // prog12 //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    prog12: { $extends: 'development' },
    //
    // prog12 //////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // prog28 //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    prog28: { $extends: 'development' },
    //
    // prog28 //////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // user316 /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    user316: { $extends: 'development',
        swift: {
            loggerManager: {
                loggers: {
                    error: {
                        path:     './log/error.log',
                        stopped:  false,
                        disabled: false
                    }
                }
            }
        }
    }
    //
    // user316 /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};