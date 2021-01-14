module.exports = {
    // export = :{
        configureWebpack: {
            //拓展webpack
            devServer: {
                before(app) {
                    app.get('/videos', function (req, res) {
                        res.json({
                            code: 0,
                            videos: [
                                {
                                  id:0,
                                  videoUrl: "http://qjzbs7gus.hn-bkt.clouddn.com/111.mp4",
                                  poster: "https://image.pearvideo.com/cont/20201104/cont-1705200-12501405.jpg",
                                  likenum: 101,
                                  author:"../static/image/a1.png",
                                  playing:false
                                },
                                {
                                  id:1,
                                  videoUrl: "http://qjzbs7gus.hn-bkt.clouddn.com/444.mp4",
                                  poster: "https://image1.pearvideo.com/cont/20201110/11881540-175126-1.png",
                                  likenum: 74456,
                                  author:"./image/a2.png",
                                  playing:false
                                },
                                {
                                  id:2,
                                  videoUrl: "http://qjzbs7gus.hn-bkt.clouddn.com/333.mp4",
                                  poster: "https://image2.pearvideo.com/cont/20201110/cont-1706213-12505001.jpg",
                                  likenum: 567,
                                  author:"./image/a3.png",
                                  playing:false
                                },
                                {
                                  id:3,
                                  videoUrl: "http://qjzbs7gus.hn-bkt.clouddn.com/222.mp4",
                                  poster: "https://image1.pearvideo.com/cont/20201105/cont-1705569-12502720.png",
                                  likenum: 242543,
                                  author:"./image/a4.png",
                                  playing:false
                                }
                              ]
                        })
                    })
                }
            }
        }
    }