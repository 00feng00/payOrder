# HOT TO USE
```
import Loading from './index'
  <button
                    onClick={() => {
                    var opt={}
                        self.loading = Loading(opt)
                        setTimeout(() => {
                            self.loading.close()
                        }, 10000)
                    }}
                >show
                </button>

```
# options
logo:string(加载图像，可以使用定易默认)
width:number
height:number
text:""  加载文字
