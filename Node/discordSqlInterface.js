sql.connect()
    .then((conn) => {
        new sql.command('spUserCreate', conn)
            .then((command) => {
                command.input('AdminId', util.sqlType.Int, req.session.user.id);
                command.input('Fore', util.sqlType.VarChar, req.body.username.split('.')[0]);
                command.input('Sur', util.sqlType.VarChar, req.body.username.split('.')[1]);
                command.input('Type', util.sqlType.Int, req.body.type);
                command.RunQuery()
                    .then((result) => {
                        result = JSON.parse(result.recordsets[0][0].json);
                        res.json({
                            error: result.error || '',
                            isLoggedIn: req.session.isLoggedIn,
                            userAccount: result
                        });
                    })
                    .catch((err) => responseError(err, res, 'run query'));
            })
            .catch((err) => responseError(err, res, 'command'));
    })
    .catch((err) => responseError(err, res, 'connection'));