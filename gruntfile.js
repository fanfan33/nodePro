module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            ejs: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                // tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
              script: 'app.js',
              options: {
                args: [],
                nodeArgs: [],
                env: {
                  PORT: '3000'
                },
                cwd: __dirname,
                ignore: ['node_modules/**', 'README.md'],
                ext: 'js',
                watch: ['./'],
                delay: 1000,
              }
            },
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-nodemon')     //实时监听入口app.js文件，实现自动重启
    grunt.loadNpmTasks('grunt-concurrent')      //优化慢任务的构建时间，比如sass,less，并发执行多个阻塞的任务,比如nodemon和watch

    grunt.option('force', true);
    grunt.registerTask('default', ['concurrent'])
}