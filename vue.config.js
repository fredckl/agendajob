module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/agendajob/'
    : '/',
  chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Agenda Job";
                return args;
            })
    }
}