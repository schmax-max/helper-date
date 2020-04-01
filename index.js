const {app, ports, service} = require('./config');
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : ports[service];
app.listen(port, () => {
    console.log('==========================')
    console.log('==========================')
    console.log(`=   ${service}   =`);
    console.log('==========================')
    console.log('==========================')
    console.log(`= listening on port ${port} =`)
    console.log('==========================')
    console.log('==========================')
});