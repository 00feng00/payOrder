import React from 'react';
import style from './style.css'
import {Input, Form, Select, Icon, Radio, DatePicker, Button} from 'antd'
import MyIcon from "../../component/Icon/icon";

const FormItem = Form.Item;
const Option = Select.Option
const RadioGroup = Radio.Group;
import {Stage, Layer, Image, Group, Rect, Circle} from 'react-konva'

function MIN(a, b) {
    if (a > b) {
        return b
    } else {
        return a
    }
}


class CutImage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            image: props.image,
            cutImage: new window.Image(),
            cutImage_url: "",
            allowZoomOut: false,
            position: {x: 0.5, y: 0.5},
            scale: 0.9,
            rotate: 0,
            borderRadius: 0,
            preview: null,
            width: 200,
            height: 200,
            uploadImage_web_width: 400,
            uploadImage_web_height: 400,
            uploadImage_width: 0,
            uploadImage_height: 0,
            cut_image_width: 100,
            cut_image_height: 100,
            cut_image_left: 100,
            cut_image_top: 100,
            draggable_left_top: true,
            draggable_right_top: true,
            draggable_left_bottom: true,
            draggable_right_bottom: true,
        }
        this.cache_cut_image_width = 0;
        this.cache_cut_image_height = 0;
        this.begin_x = 0;
        this.begin_y = 0;
        this.end_x = 0;
        this.end_y = 0
    }


    componentWillReceiveProps(nextProps) {
        var self = this;
        /*图片一样不是新上传图片操作*/
        if (this.props.image.src == nextProps.image.src) {
            this.setState({
                image: nextProps.image
            })
            self.setState({
                uploadImage_width: nextProps.image.width,
                uploadImage_height: nextProps.image.height
            })
            var mix_length_width = MIN(nextProps.image.width, 400)
            var mix_length_height = MIN(nextProps.image.height, 400)
            self.setState({
                uploadImage_web_width: mix_length_width,
                uploadImage_web_height: mix_length_height,
            })

            if (self.imageNode) {
                self.imageNode.getLayer().batchDraw();
            }
        } else {
            this.setState({
                image: nextProps.image
            })
            self.setState({
                uploadImage_width: nextProps.image.width,
                uploadImage_height: nextProps.image.height
            })
            var mix_length_width = MIN(nextProps.image.width, 400)
            var mix_length_height = MIN(nextProps.image.height, 400)
            self.setState({
                uploadImage_web_width: mix_length_width,
                uploadImage_web_height: mix_length_height,
                cut_image_left: mix_length_width / 2,
                cut_image_top: mix_length_height / 2
            })
            createCutImage(
                self.state.cut_image_width,
                self.state.cut_image_height,
                self.state.cut_image_left,
                self.state.cut_image_top,
                nextProps.image).then(res => {
                self.setState({
                    cutImage: res.result,
                    cutImage_url: res.url
                })
                self.props.onChange(res.url)
            })

            if (self.imageNode) {
                self.imageNode.getLayer().batchDraw();
            }
        }

    }

    componentDidMount() {
        var self = this
        createCutImage(
            self.state.cut_image_width,
            self.state.cut_image_height,
            self.state.cut_image_left,
            self.state.cut_image_top,
            self.state.image).then(res => {
            self.setState({
                cutImage: res.result,
                cutImage_url: res.url
            })
            self.props.onChange(res.url)
        })
    }


    render() {
        var self = this;
        var {uploadImage_web_width, uploadImage_web_height} = this.state;
        return (
            <div className={style.Avatar}>
                <Stage width={400} height={400}>
                    <Layer>
                        <Rect
                            width={400}
                            height={400}
                            fill={"#eee"}
                        ></Rect>
                        <Image
                            ref={node => {
                                this.imageNode = node;
                            }}
                            image={this.state.image}
                            x={200}
                            y={200}
                            offsetX={uploadImage_web_width / 2}
                            offsetY={uploadImage_web_height / 2}
                            width={uploadImage_web_width}
                            height={uploadImage_web_height}
                        ></Image>
                        {/*mark*/}
                        <Rect
                            width={400}
                            height={400}
                            fill={"#eeeeee"}
                            opacity={.3}
                        >
                        </Rect>
                        <Group
                            x={(400 - self.state.uploadImage_web_width) / 2}
                            y={(400 - self.state.uploadImage_web_height) / 2}
                        >
                            <Group
                            >
                                <Image
                                    x={this.state.cut_image_left}
                                    y={this.state.cut_image_top}
                                    ref={node => {
                                        this.cutImageNode = node;
                                    }}
                                    width={this.state.cut_image_width}
                                    height={this.state.cut_image_height}
                                    image={this.state.cutImage}
                                    draggable={true}
                                    stroke={"#222"}
                                    strokeWidth={4}
                                    lineJoin={"miter"}
                                    onDragMove={(event) => {
                                        createCutImage(
                                            self.state.cut_image_width,
                                            self.state.cut_image_height,
                                            event.target.attrs.x,
                                            event.target.attrs.y,
                                            self.state.image).then(res => {
                                            self.setState({
                                                cut_image_left: event.target.attrs.x,
                                                cut_image_top: event.target.attrs.y,
                                                cutImage: res.result,
                                                cutImage_url: res.url
                                            })
                                            self.props.onChange(res.url)
                                        })
                                    }}
                                >
                                </Image>

                                <Circle
                                    x={this.state.cut_image_left}
                                    y={this.state.cut_image_top}
                                    width={10}
                                    height={10}
                                    stroke={"#222"}
                                    fill={"#eee"}
                                    strokeWidth={2}
                                    draggable={true}
                                    onDragStart={(event) => {
                                        self.begin_x = event.target.attrs.x
                                        self.begin_y = event.target.attrs.y
                                        self.cache_cut_image_width = Math.abs(self.state.cut_image_width)
                                        self.cache_cut_image_height = Math.abs(self.state.cut_image_height)
                                        self.borderCircilInit()
                                    }}
                                    onDragMove={(event) => {
                                        self.end_x = event.target.attrs.x
                                        self.end_y = event.target.attrs.y
                                        var cut_image_width = self.cache_cut_image_width + self.begin_x - self.end_x;
                                        var cut_image_height = self.cache_cut_image_height + self.begin_y - self.end_y
                                        if (cut_image_width < 300 && cut_image_height < 300) {
                                            self.setState({
                                                cut_image_width: cut_image_width,
                                                cut_image_height: cut_image_height,
                                                cut_image_left: event.target.attrs.x,
                                                cut_image_top: event.target.attrs.y,
                                            })
                                            createCutImage(
                                                self.state.cut_image_width,
                                                self.state.cut_image_height,
                                                self.state.cut_image_left,
                                                self.state.cut_image_top,
                                                self.state.image).then(res => {
                                                self.setState({
                                                    cutImage: res.result,
                                                    cutImage_url: res.url
                                                })
                                            })
                                        } else {
                                            self.setState({
                                                cut_image_left: self.state.cut_image_left,
                                                cut_image_top: self.state.cut_image_top,
                                            })
                                        }
                                    }}
                                    onDragEnd={() => {
                                        self.end_x = 0
                                        self.end_y = 0
                                        self.begin_x = 0
                                        self.begin_y = 0
                                    }}
                                ></Circle>
                                <Circle
                                    x={this.state.cut_image_left + this.state.cut_image_width}
                                    y={this.state.cut_image_top}
                                    width={10}
                                    height={10}
                                    stroke={"#222"}
                                    fill={"#eee"}
                                    strokeWidth={2}
                                    draggable={true}
                                    onDragStart={(event) => {
                                        self.begin_x = event.target.attrs.x
                                        self.begin_y = event.target.attrs.y
                                        self.cache_cut_image_width = Math.abs(self.state.cut_image_width)
                                        self.cache_cut_image_height = Math.abs(self.state.cut_image_height)
                                    }}
                                    onDragMove={(event) => {
                                        self.end_x = event.target.attrs.x
                                        self.end_y = event.target.attrs.y
                                        var cut_image_width = self.cache_cut_image_width + self.end_x - self.begin_x
                                        var cut_image_height = self.cache_cut_image_height + self.begin_y - self.end_y
                                        if (cut_image_width < 300 && cut_image_height < 300) {
                                            self.setState({
                                                cut_image_width: cut_image_width,
                                                cut_image_height: cut_image_height,
                                                cut_image_top: event.target.attrs.y,
                                            })
                                            createCutImage(
                                                self.state.cut_image_width,
                                                self.state.cut_image_height,
                                                self.state.cut_image_left,
                                                self.state.cut_image_top,
                                                self.state.image).then(res => {
                                                self.setState({
                                                    cutImage: res.result,
                                                    cutImage_url: res.url
                                                })
                                            })
                                        } else {
                                            self.setState({
                                                cut_image_top: self.state.cut_image_top
                                            })
                                        }

                                    }}
                                    onDragEnd={(event) => {

                                    }}
                                ></Circle>
                                <Circle
                                    x={this.state.cut_image_left}
                                    y={this.state.cut_image_top + this.state.cut_image_height}
                                    width={10}
                                    height={10}
                                    stroke={"#222"}
                                    fill={"#eee"}
                                    strokeWidth={2}
                                    draggable={true}
                                    onDragStart={(event) => {
                                        self.begin_x = event.target.attrs.x
                                        self.begin_y = event.target.attrs.y
                                        self.cache_cut_image_width = Math.abs(self.state.cut_image_width)
                                        self.cache_cut_image_height = Math.abs(self.state.cut_image_height)
                                    }}
                                    onDragMove={(event) => {
                                        self.end_x = event.target.attrs.x
                                        self.end_y = event.target.attrs.y
                                        var cut_image_width = self.cache_cut_image_width + self.begin_x - self.end_x,
                                            cut_image_height = self.cache_cut_image_height + self.end_y - self.begin_y
                                        if (cut_image_width < 300 && cut_image_height < 300) {
                                            self.setState({
                                                cut_image_width: cut_image_width,
                                                cut_image_height: cut_image_height,
                                                cut_image_left: event.target.attrs.x,
                                            })
                                            createCutImage(
                                                self.state.cut_image_width,
                                                self.state.cut_image_height,
                                                self.state.cut_image_left,
                                                self.state.cut_image_top,
                                                self.state.image).then(res => {
                                                self.setState({
                                                    cutImage: res.result,
                                                    cutImage_url: res.url
                                                })
                                                self.props.onChange(res.url)
                                            })
                                        } else {
                                            self.setState({
                                                cut_image_left: self.state.cut_image_left,
                                                cut_image_top: self.state.cut_image_top,
                                            })
                                        }
                                    }}
                                    onDragEnd={(event) => {

                                    }}
                                ></Circle>
                                <Circle
                                    x={this.state.cut_image_left + this.state.cut_image_width}
                                    y={this.state.cut_image_top + this.state.cut_image_height}
                                    width={10}
                                    height={10}
                                    stroke={"#222"}
                                    fill={"#eee"}
                                    strokeWidth={2}
                                    draggable={true}
                                    onDragStart={(event) => {
                                        self.begin_x = event.target.attrs.x
                                        self.begin_y = event.target.attrs.y
                                        self.cache_cut_image_width = Math.abs(self.state.cut_image_width)
                                        self.cache_cut_image_height = Math.abs(self.state.cut_image_height)
                                    }}
                                    onDragMove={(event) => {
                                        self.end_x = event.target.attrs.x
                                        self.end_y = event.target.attrs.y
                                        var cut_image_width = self.cache_cut_image_width + self.end_x - self.begin_x,
                                            cut_image_height = self.cache_cut_image_height + self.end_y - self.begin_y
                                        if (cut_image_width < 300 && cut_image_height < 300) {
                                            self.setState({
                                                cut_image_width: cut_image_width,
                                                cut_image_height: cut_image_height,
                                            })
                                            createCutImage(
                                                self.state.cut_image_width,
                                                self.state.cut_image_height,
                                                self.state.cut_image_left,
                                                self.state.cut_image_top,
                                                self.state.image).then(res => {
                                                self.setState({
                                                    cutImage: res.result,
                                                    cutImage_url: res.url
                                                })
                                                self.props.onChange(res.url)
                                            })
                                        } else {
                                            self.setState({
                                                cut_image_left: self.state.cut_image_left,
                                                cut_image_top: self.state.cut_image_top,
                                            })
                                        }

                                    }}
                                    onDragEnd={(event) => {
                                    }}
                                ></Circle>
                            </Group>
                        </Group>
                    </Layer>
                </Stage>

                <div className={style.preview}>
                    <div><h1> preview:100x100</h1></div>
                    <div>
                        <img src={this.state.cutImage_url}
                             width="100"
                             height="100"
                             alt=""/>
                    </div>
                </div>
            </div>

        );
    }

}

function loadImage(src) {
    var image = new window.Image();
    image.crossOrigin = "Anonymous"
    image.src = src;
    var promise = new Promise((resolve, reject) => {
        image.onload = () => {
            resolve(image)
        }
    })
    return promise
}

async function sizeImage(image, width, height) {
    var canvas = document.createElement('canvas')
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d')
    image.crossOrigin = "Anonymous"
    ctx.drawImage(image,
        0, 0, width, height)
    var result = await loadImage(canvas.toDataURL("image/png"));
    return result
}

async function createCutImage(width, height, left, top, o_image) {
    var mix_length_width = MIN(o_image.width, 400)
    var mix_length_height = MIN(o_image.height, 400)
    var image = await  sizeImage(o_image, mix_length_width, mix_length_height)
    var canvas = document.createElement('canvas')
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d')
    image.crossOrigin = "Anonymous"
    ctx.drawImage(image,
        left, top, width, height,
        0, 0, width, height)
    var result = await loadImage(canvas.toDataURL("image/png"));
    return {result, url: canvas.toDataURL("image/png")}
}

CutImage.defaultProps = {
    image: new window.Image(),
    onChange() {
    }
}
export default CutImage;