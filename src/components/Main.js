require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

// 获取图片数据并将图片名信息转换为URL路径
let imageDatas = require('../data/imageDatas.json');

imageDatas = (function(imageDatasArr){
	for(var i = 0, len = imageDatas.length; i < len; i++){
		var singleImageData = imageDatasArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
      < section className = "stage" ref = "stage" >
       < section className = "img-sec" >
       < /section>
       < nav className = "controller-nav" >
       < /nav>
      < /section >
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
