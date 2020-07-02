/* eslint-disable no-console */
// import cookie from 'js-cookie'
/**
 * 2019/06/18 by huangtianhan
 */
import Exif from "exif-js";
export default {
  install(Vue) {
    (Vue.prototype.saveSession = (name, content) => {
      window.sessionStorage.setItem(name, JSON.stringify(content));
    }),
      (Vue.prototype.getSession = name => {
        return JSON.parse(window.sessionStorage.getItem(name));
      }),
      (Vue.prototype.uploadImgToBase64 = file => {
        return new Promise((resolve, reject) => {
          let Orientation; //去获取拍照时的信息，解决拍出来的照片旋转问题
          Exif.getData(file, function() {
            Orientation = Exif.getTag(this, "Orientation");
          });
          const reader = new FileReader();
          console.info("文件大小：" + file.size / 1024 / 1024);
          if (file.size / 1024 / 1024 > 10) {
            console.info("文件大于10M");
            return;
          }
          reader.readAsDataURL(file);
          reader.onload = function(e) {
            let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
            image.src = e.target.result;
            var base64 = "";
            //var base64_ios = "";
            var quality = 1;
            image.onload = function() {
              let canvas = document.createElement("canvas"),
                context = canvas.getContext("2d"),
                imageWidth = image.width, //压缩前图片的大小
                imageHeight = image.height;
              var maxWidth = 800;
              var maxHeight = 800;
              if (imageWidth > maxWidth || imageHeight > maxHeight) {
                if (imageWidth / imageHeight > maxWidth / maxHeight) {
                  // 更宽，按照宽度限定尺寸
                  canvas.width = maxWidth;
                  canvas.height = Math.round(
                    (maxWidth * imageHeight) / imageWidth
                  );
                } else {
                  canvas.height = maxHeight;
                  canvas.width = Math.round(
                    (maxHeight * imageWidth) / imageHeight
                  );
                }
              } else {
                canvas.height = imageHeight;
                canvas.width = imageWidth;
              }
              console.info("宽和高：" + canvas.width, canvas.height);
              console.info("方向：" + Orientation);
              console.info("手机类型：" + navigator.userAgent);
              if (navigator.userAgent.match(/iPhone/i)) {
                if (Orientation != "" && Orientation != 1) {
                  //base64_ios = canvas.toDataURL("image/jpeg", quality);
                  switch (Orientation) {
                    case 6: //需要顺时针（向左）90度旋转
                      rotateImg(image, "left", canvas);
                      break;
                    case 8: //需要逆时针（向右）90度旋转
                      rotateImg(image, "right", canvas);
                      break;
                    case 3: //需要180度旋转
                      rotateImg(image, "right", canvas); //转两次
                      rotateImg(image, "right", canvas);
                      break;
                  }
                } else {
                  context.drawImage(image, 0, 0, canvas.width, canvas.height);
                }
              } else {
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
              }
              base64 = canvas.toDataURL("image/jpeg", quality);
              var strLength = base64.length;
              var fileLength = parseInt(strLength - (strLength / 8) * 2);

              // 由字节转换为KB
              var size = "";
              size = (fileLength / 1024).toFixed(2);
              while (parseInt(size) > 1000) {
                quality = 0.9 * quality;
                base64 = canvas.toDataURL("image/jpeg", quality);
                strLength = base64.length;
                fileLength = parseInt(strLength - (strLength / 8) * 2);

                size = (fileLength / 1024).toFixed(2);
              }
              console.info(size + "kb");
              resolve(base64);
              //return data;
            };
            // 图片转base64完成后返回reader对象
            //resolve(data);
          };
          reader.onerror = reject;
        });
      }),
      (Vue.prototype.getFileUrl = obj => {
        let url;
        url = window.URL.createObjectURL(obj.files.item(0));
        return url;
      });
  }
};
function rotateImg(img, direction, canvas) {
  //最小与最大旋转方向，图片旋转4次后回到原方向
  const min_step = 0;
  const max_step = 3;
  if (img == null) return;
  //img的高度和宽度不能在img元素隐藏后获取，否则会出错
  let height = img.height;
  let width = img.width;
  let step = 2;
  if (step == null) {
    step = min_step;
  }
  if (direction == "right") {
    step++;
    //旋转到原位置，即超过最大值
    step > max_step && (step = min_step);
  } else {
    step--;
    step < min_step && (step = max_step);
  }
  //旋转角度以弧度值为参数
  let degree = (step * 90 * Math.PI) / 180;
  let ctx = canvas.getContext("2d");
  console.info("步数" + step);
  switch (step) {
    case 0:
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);
      break;
    case 1:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, 0, -height);
      break;
    case 2:
      canvas.width = width;
      canvas.height = height;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, -height);
      break;
    case 3:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, 0);
      break;
  }
}
