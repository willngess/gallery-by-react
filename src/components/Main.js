require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

// 获取图片数据并将图片名信息转换为URL路径
let imageDatas = require('../data/imageDatas.json');

imageDatas = ((imageDatasArr) => {
	for (var i = 0, len = imageDatas.length; i < len; i++) {
		var singleImageData = imageDatasArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);

/*
*	获取区间内的随机取值
*
*/
const getRangeRandom = (low, high) => {
	return Math.floor(Math.random() * (high - low) + low);
}

/*
* 获取旋转角度的范围
*/
const getDegRandom = () => {
  let baseDeg = 30;
  return (Math.random()>0.5?'':'-')+Math.ceil(Math.random()*baseDeg);
}

class ImgFigure extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			style:{
				width: '100%',
				height: '100%'
			}
		};

	}

	handleClick = (e) => {

		e.stopPropagation();
		e.preventDefault();

		//图片居中则翻转，否则居中
		if(this.props.arrange.isCenter){
			this.props.inverse()
		}else{
			this.props.center()
		}
	}
	componentDidMount(){
		this.refs.imgDesc.innerHTML = this.props.data.desc;
	}

	render() {

		var styleObj = {};

		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos;
		}

		if(this.props.arrange.rotate){
			['MozTransform','msTransform','WebkitTransform','OTransform','transform'].forEach((value) => {
				styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			})
		}

		if(this.props.arrange.isCenter){
			styleObj.zIndex = 11
		}else{
			styleObj.zIndex = 1
		}

		var imgFigureClassName = 'img-figure';
		imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';


		return (
			<figure className={imgFigureClassName} style={styleObj} ref="imgFigure" onClick={this.handleClick}>
				<img style={this.state.style} src={this.props.data.imageURL}
				alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-back" onClick={this.handleClick} ref="imgDesc"></div>
				</figcaption>
			</figure>
		);
	}
}


class ControllerUnits extends React.Component {

	handleClick = (e) => {

		e.stopPropagation();
		e.preventDefault();

		//图片居中则翻转，否则居中
		if(this.props.arrange.isCenter){
			this.props.inverse()
		}else{
			this.props.center()
		}

	}

	render() {

		var controllerUnitClassName = 'controller-unit';

		if(this.props.arrange.isCenter){
			controllerUnitClassName += ' is-center';
		}

		if(this.props.arrange.isInverse){
			controllerUnitClassName += ' is-inverse';
		}

		return (
			<span className={controllerUnitClassName} onClick={this.handleClick}></span>
		);
	}

}

class AppComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
        imgsArrangeArr: [
	          /*
	          {
	            pos: {
	              left: 0,
	              right: 0
	            },
	            rotate: 0,
	            isInverse: false //图片正反面
	          },
	          isCenter:false //图片默认不居中
	          isInverse:false  //默认图片不翻转
	          */
      	]
      };


		this.Constant = {
			centerPos: {
				top: 0,
				left: 0
			},
			hPosRange: {			//水平方向取值范围
				leftSecX: [0, 0],
				rightSecX: [0, 0],
				y: [0, 0]
			},
			vPosRange: {			//垂直方向取值范围
				x: [0, 0],
				topY: [0, 0]
			}
		}
	}

	/**
	*	重新布局所有图片
	*	@param	{int} centerIndex 制定居中图片的index
	*/

	rearrange(centerIndex) {

		var imgsArrangeArr = this.state.imgsArrangeArr,
			Constant = this.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,

			imgsArrangeTopArr = [],
			topImgNum = Math.floor(Math.random() * 2),
			topImgSpliceIndex = 0,

			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

		//首先居中中心图片
		imgsArrangeCenterArr[0] = {
			pos: centerPos,
			rotate: 0,
			isInverse: false,
			isCenter: true
		}


		//取出要布局上侧的图片的状态信息
		topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
		imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

		//布局位于上侧的图片
		imgsArrangeTopArr.forEach((value, index) => {
			imgsArrangeTopArr[index] = {
				pos: {
					top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
					left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
				},
				rotate:getDegRandom(),
				isInverse: false,
				isCenter:false
			}
		});

		//布局两侧图片
		for(var i = 0, len = imgsArrangeArr.length, k = len / 2; i < len; i++){
			var hPosRangeLORX = null;

			if(i < k){
				hPosRangeLORX = hPosRangeLeftSecX;
			}else{
				hPosRangeLORX = hPosRangeRightSecX;
			}

			imgsArrangeArr[i] = {
				pos: {
					top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
					left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
				},
				rotate:getDegRandom(),
				isInverse: false,
				isCenter:false
			}

		}
			if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
				imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
			}

			imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

		this.setState({
			imgsArrangeArr: imgsArrangeArr
		});

	}


	/*
	*	翻转图片
	*	@param {int} index 当前需要翻转的图片的index值
	*	@paeam {Function} 返回的是一个方法
	*/

	inverse(index){
		return () => {
			var imgsArrangeArr = this.state.imgsArrangeArr;

			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

			this.setState({
				imgsArrangeArr: imgsArrangeArr
			});
		}
	}

	/*
	*	将图片放到居中位置
	* 	@param {int} index 当前需要居中的图片的index值
	*	@paeam {Function} 返回的是一个方法
	*/
	center(index){
		return () => {

			this.rearrange(index)
		}
	}

	componentDidMount () {

		// 舞台相关数据
		var stageDOM = this.refs.stage,
			stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,
			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);

		// imageFigure相关数据
		var imgFigureDOM = this.refs.imgFigure0.refs.imgFigure,
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);


		//中心图片位置
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		}

		//水平方向取值范围
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.Constant.hPosRange.y[0] = -halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;

		//垂直方向的取值范围
		this.Constant.vPosRange.x[0] = halfStageW - imgW;
		this.Constant.vPosRange.x[1] = halfStageW;
		this.Constant.vPosRange.topY[0] = -halfImgH * 1.25;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

		this.rearrange(0);

	}

	render() {

		var controllerUnits = [],
			imgFigures = [];

		imageDatas.forEach((value, index) => {

			if(!this.state.imgsArrangeArr[index]){
				this.state.imgsArrangeArr[index] = {
					pos: {
						top: '0',
						left: '0'
					},
					rotate: 0,
					isInverse: false,
					isCenter: false
				}
			}

			imgFigures.push( <ImgFigure key={index} ref={'imgFigure' + index} data = {value} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} /> )
			controllerUnits.push(<ControllerUnits key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />)

		});

		return (
			<section className = "stage" ref = "stage">
				<section className = "img-sec">
					{imgFigures}
				</section>
				<nav className = "controller-nav">
					{controllerUnits}
				</nav>
			</section>
		);
	}
}

AppComponent.defaultProps = {};

export default AppComponent;