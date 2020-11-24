<template>
<div>
  <el-dialog title="图片上传"
             :visible="true"
             :before-close="closecropperModel"
             class="jxf-upload"
             :class="tCropWidth > 200 ? 'lcropper' : 'scropper'" @close="$emit('update:isShowCropper', false)" append-to-body :close-on-click-modal="false">
    <div class="cropper_content" :class="{ small: tCropHeight <= 300, big: tCropHeight > 300 }">
      <el-row :gutter="10">
        <el-col :span="16" class="imageArea" v-if="option.image">
          <vueCropper
            ref="cropper"
            :img="option.image ? option.image : dealImage"
            :autoCrop="true"
            :info="true"
            :full="false"
            outputType="png"
            :fixedBox="fixedBox"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :outputSize="option.outputSize"
            @realTime="realTime"
          >
          </vueCropper>
        </el-col>
        <el-col :span="8">
          <div class="prewArea" :style="tCropWidth > 200 ? previewStyleBig : previewStyle">
            <div :style="previews.div" class="preview" v-if="previews.url || option.image || dealImage">
              <img :src="previews.url ? previews.url : dealImage" :style="previews.img">
            </div>
          </div>
          <el-row :gutter="10">
            <el-col :span="22">
              <div class="changeImage">
                <label class="btn" for="uploads">选择图片</label>
                <input type="file" ref="uploads" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="setImage($event, 1)">
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="option.image">
            <el-col :span="11">
              <!-- 放大 -->
              <el-button type="success" @click="changeScale(1)">放大</el-button>
            </el-col>
            <el-col :span="11">
              <!-- 缩小 -->
              <el-button type="success" @click="changeScale(-1)">缩小</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="option.image">
            <el-col :span="11">
              <!-- 左旋转 -->
              <el-button type="success" @click="rotateLeft">左旋转</el-button>
            </el-col>
            <el-col :span="11">
              <!-- 右旋转 -->
              <el-button type="success" @click="rotateRight">右旋转</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="option.image">
            <el-col :span="11">
              <!-- 上传 -->
              <el-button type="success" @click="uploadImg('blob')">上传</el-button>
            </el-col>
            <el-col :span="11">
              <!-- 取消 -->
              <el-button type="success" @click="cancelUpload">取消</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="footer-btn">
      <div class="scope-btn">
        <div class="loadImg">
        </div>
      </div>
    </div>
  </el-dialog>
  </div>
</template>
 
<script>
  import axios from 'axios'
 
  export default {
    name: "jxf-cropper",
    props: {
      isShowCropper: {
        type: Boolean,
        default: false
      },
      fixedBox: {
        type: Boolean,
        default: true
      },
      tCropWidth: {
        type: Number,
        default: 800
      },
      tCropHeight: {
        type: Number,
        default: 800
      },
      dealImage: {
        type: String,
        default: null
      },
      getChangedImage: {
        type: Function,
        default: () => {}
      },
      uploadUrl: {
        type: String,
        default: ""
      },
      dataSize: {
        type: Number,
        default: 3
      }
    },
    data() {
      return {
        previewStyle: {
          'width': '230px',
          'max-height': '230px',
          'overflow': 'hidden',
          'zoom': '0.75'
        },
        previewStyleBig: {
          'overflow': 'hidden',
          'zoom': '0.23'
        },
        fileList: [], // 用来存放图片（用来装饰）
        previews: {},
        fileUpload: null,
        option: {
          outputSize: 1,
          full: false,
          autoCrop: true,
          fixedBox: true,
          autoCropWidth: this.tCropWidth,
          autoCropHeight: this.tCropHeight,
          image: null,
        },
        isShowModel: this.isShowCropper,
      }
    },
    methods: {
      setImage(e, num) {
        var file = e.target.files[0]
        this.fileUpload = file
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$message.warning('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.option.image = data
          }
          this.$refs['uploads'].value = ''
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      },
 
      // 放大缩小
      changeScale(num) {
        num = num || 1;
        this.$refs.cropper.changeScale(num);
      },
 
      // 左旋转
      rotateLeft() {
        this.$refs.cropper.rotateLeft();
      },
 
      // 右旋转
      rotateRight() {
        this.$refs.cropper.rotateRight();
      },
 
      // 上传
      uploadImg(type) {
        let formData = new FormData();
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            let img = window.URL.createObjectURL(data);
            if(data.size / 1024 / 1024 > this.dataSize) {
              this.$message({
                message: '上传图片不能超过' + this.dataSize,
                type: 'warning'
              });
              return false;
            }
            var _obj = { name: this.fileUpload.name }
            var X = this.fileUpload.name.substring(this.fileUpload.name.lastIndexOf('.'), this.fileUpload.name.length)
            _obj.name = this.fileUpload.name.substring(0, this.fileUpload.name.lastIndexOf('.'))
            var reg = /^[\u4e00-\u9fa5\(\)_a-zA-Z0-9]+$/
 
            if(!reg.test(_obj.name)) {
              _obj.name = _obj.name.replace(/[^\u4e00-\u9fa5\(\)_a-zA-Z0-9]+/g, '')
            }
            _obj.name = _obj.name + X;
            formData.append("file", data, _obj.name);
            axios.post(this.uploadUrl, formData, {headers: { 'Content-Type': 'multipart/form-data' }})
              .then(res => {
                if(res.data.success) {
                  // 这里将图片返回前面一个页面
                  // 预留
                  this.$emit('getChangedImage', res.data.data.fileUrl);
                  this.cancelUpload();
                } else {
                  this.$message.error("上传失败");
                }
              })
          });
        } else {
          // 预留
        }
      },
 
      // 取消上传
      cancelUpload() {
        this.fileUpload = null;
        this.option = {
          outputSize: 1,
          autoCrop: true,
          fixedBox: true,
          autoCropWidth: this.tCropWidth,
          autoCropHeight: this.tCropHeight,
          image: null,
        };
        this.previews = {}
        if(this.option.image) {
          this.$refs['cropper'].imgs = "";
        }
 
        this.$emit('update:isShowCropper', false);
      },
 
      // 预览
      realTime(data) {
        this.previews = {
          ...data
        };
      },
 
      // 将base64的图片转换为file文件
      convertBase64UrlToBlob(urlData) {
        let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
      },
 
      // 关闭弹窗之前
      closecropperModel(done) {
        this.fileUpload = null
        this.option = {
          outputSize: 1,
          autoCrop: true,
          fixedBox: true,
          autoCropWidth: this.tCropWidth,
          autoCropHeight: this.tCropHeight,
          image: null,
        };
        if(this.option.image) {
          this.$refs['cropper'].imgs = "";
        }
        this.previews = {}
        // this.dealImage = null;
        done();
      }
    },
    watch: {
      isShowCropper(param) {
        this.isShowModel = param;
      }
    },
  }
</script>
 
<style lang="scss">
  .scropper {
    .el-dialog {
      width: 600px!important;
      .cropper_content {
        .vue-cropper {
          width: 350px!important;
          height: 350px!important;
          .cropper-crop-box {
            width: 200px;
            height: 200px;
          }
          .cropper-modal {
            background: url("data:image/png")!important;
          }
        }
        .prewArea {
          flex: 1;
          -webkit-flex: 1;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          -webkit-justify-content: center;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMzTjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
          .preview{
            overflow: hidden;
            /*margin-left: 40px;*/
            img {
              max-height: 1000px!important;
            }
          }
        }
        .el-button {
          margin-top: 10px;
          width: 100%;
          height: 40px;
          font-size: 12px;
          text-align: center;
        }
        .changeImage {
          margin-top: 10px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 12px;
          color: #fff;
          background: #67c23a;
          border-color: #67c23a;
          border-radius: 4px;
        }
      }
    }
  }
  .jxf-upload {
    .btn {
      display: inline-block;
      width: 100%;
      cursor: pointer;
    }
    small {
      zoom: .5;
    }
    big {
      zoom: .5;
    }
    .imageArea {
      position: relative;
    }
  }
  .lcropper {
 
    .el-dialog {
      width: 600px!important;
      .cropper_content {
        .vue-cropper {
          width: 900px!important;
          height: 900px!important;
          zoom: .4;
          .cropper-crop-box {
            width: 800px;
            height: 800px;
          }
          .cropper-modal {
            background: url("data:image/png")!important;
          }
        }
        .prewArea {
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMzTjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
          .preview{
            overflow: hidden;
            /*margin-left: 40px;*/
            img {
              max-height: 1400px!important;
            }
          }
        }
        .el-button {
          margin-top: 10px;
          width: 100%;
          height: 40px;
          font-size: 12px;
          text-align: center;
        }
        .changeImage {
          margin-top: 10px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 12px;
          color: #fff;
          background: #67c23a;
          border-color: #67c23a;
          border-radius: 4px;
        }
      }
    }
  }
</style>