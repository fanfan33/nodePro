module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            ejs: {
                files: ['app/views/**/*.ejs'],
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
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'public/js',
                    src: '**/*.js',
                    dest: 'public/dest/js',
                    ext: '.min.js'
                }]
            }
        },
        less: {
            development: {
              options: {
                paths: ['public/less']
              },
              files: {
                'public/dest/css/common.css': 'public/less/common.less'
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
                tasks: ['nodemon', 'watch', 'uglify', 'less'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-nodemon')     //实时监听入口app.js文件，实现自动重启
    grunt.loadNpmTasks('grunt-concurrent')      //优化慢任务的构建时间，比如sass,less，并发执行多个阻塞的任务,比如nodemon和watch

    grunt.option('force', true);
    grunt.registerTask('default', ['concurrent'])
}