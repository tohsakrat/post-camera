import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import DiscussionControls from 'flarum/forum/utils/DiscussionControls';
import PostControls from 'flarum/forum/utils/PostControls';
import Button from 'flarum/common/components/Button';
import { domToPng } from 'modern-screenshot'

app.initializers.add('tohsakarat-postCamera', () => {
  function trimUrl(url) {
    // 分割 URL 以'/d/'为界
                var parts = url.split('/d/');
              
                // 检查是否正确分割成两部分
                if (parts.length === 2) {
                  // 分割第二部分以'-'为界，以获取第一个'-'之前的所有内容
                  var subParts = parts[1].split('-');
              
                  // 检查是否正确分割
                  if (subParts.length > 1) { 
                    // 重建 URL，只包括'/d/'之前的部分和第一个'-'之前的部分
                    return parts[0] + '/d/' + subParts[0];
                  }
                }
              
                // 如果原始URL不符合预期的格式，返回未修改的URL
                return url;
          }

    window.canSave=true;
 
  //拓展发帖界面
  extend(PostControls, 'userControls', function (items, post) {
    const postUrl = app.forum.attribute('baseUrl') + app.route.post(post);

    items.add(
      'screen-shot',
      Button.component(
        {         
          disable: (!canSave),
          icon: 'fas fa-camera',
          class: canSave? '':"disabled",
          
          onclick: () => {
              if(!canSave){
                m.redraw();
                return;}
              
            window.cameraCurProgress='⏳⏳⏳';
            window.canSave=false;
            console.log('======保存截图======')
            console.log(this);
            var node=document.querySelector( '.PostStream-item[data-id="'+ post.data.id+'"] ')
            
            var box = document.createElement('div');
            box.className='temp-screenShot-box'
            
            var outerBox = document.createElement('div');
            outerBox.className='temp-screenShot-outer-box'
            
            var node1=node.cloneNode(true)
            node1.className+=' temp-screenShot'
            
            // 创建第一个 div 元素并设置类名 'coverAll'
            var firstDiv = document.createElement('div');
            firstDiv.className = 'coverAll';
            


            // 创建第一个信息标签
            var infoDiv = document.createElement('div');
            infoDiv.className = 'temp-screenShot-info';
            infoDiv.innerHTML= "<b class='from'> 👉  </b>"+trimUrl(postUrl) +" "+app.forum.data.attributes.title+"<br / >"+app?.session?.user?.data?.morseCode;
            
           // box.appendChild(firstDiv);
           
            box.appendChild( infoDiv )
            box.appendChild( node1 )
            outerBox.appendChild(box)
            node.appendChild(outerBox)
            box.querySelectorAll("img[loading='lazy']").forEach((img)=>{
              img.removeAttribute('loading')
              img.removeAttribute('importance')
            })



            setTimeout(() => {
                domToPng(box,{
                  quality:window.isPC?16:8,
                  debug: true,
                  progress: (current, total) => {
                    window.canSave=false;
                    m.redraw();
                    console.log(`${ current }/${ total }`)
                    window.cameraCurProgress=`${ current }/${ total }`
                  }
                }).then(dataUrl => {
              const link = document.createElement('a')
              link.download = "screenShot"+app.forum.data.attributes.title+ app.route.post(post)+'.png'
              link.href = dataUrl
              link.click()
              window.canSave=true;
              m.redraw();
              node.removeChild(outerBox)
            })

            },100)

            
          },
        },
        window.canSave ?  app.translator.trans('tohsakarat-post-camera.lib.scan-post'): window.cameraCurProgress
      )
    );
  
  });

  
  //拓展整个帖子
  extend(DiscussionControls, 'userControls', function (items, discussion) {
    const discussionUrl = app.forum.attribute('baseUrl') + app.route.discussion(discussion);
    ;
  
    items.add(
      'screen-shot',
      Button.component(
        {
          disable: (!canSave),
          icon: 'fas fa-camera',
          class: canSave? '':"disabled",
          
          onclick: () => {
            if(!canSave){
              m.redraw();
              return;}
            window.cameraCurProgress='⏳⏳⏳';
            window.canSave=false;
            console.log('======保存截图======')
            console.log(this);
            var node=document.querySelector( '.DiscussionPage-discussion')
            
            var box = document.createElement('div');
            box.className='temp-screenShot-box'
            
            var outerBox = document.createElement('div');
            outerBox.className='temp-screenShot-outer-box'
            
            var node1=node.cloneNode(true)
            node1.className+=' temp-screenShot'
            
            // 创建第一个 div 元素并设置类名 'coverAll'
            var firstDiv = document.createElement('div');
            firstDiv.className = 'coverAll';
            


            // 创建第一个信息标签
            var infoDiv = document.createElement('div');
            infoDiv.className = 'temp-screenShot-info';
            infoDiv.innerHTML= "<b class='from'> 👉  </b>"+trimUrl(discussionUrl) +" "+app.forum.data.attributes.title+"<br / >"+app?.session?.user?.data?.morseCode;;
            
            //box.appendChild(firstDiv);
           
            box.appendChild( infoDiv )
            box.appendChild( node1 )
            outerBox.appendChild(box)
            node.appendChild(outerBox)
            box.querySelectorAll("img[loading='lazy']").forEach((img)=>{
              img.removeAttribute('loading')
              img.removeAttribute('importance')
            })
            setTimeout(() => {
                domToPng(box,{
                  quality:window.isPC?8:4,
                  debug: true,
                  progress: (current, total) => {
                    window.canSave=false;
                    m.redraw();
                    console.log(`${ current }/${ total }`)
                    window.cameraCurProgress=`${ current }/${ total }`
                  }
                }).then(dataUrl => {
              const link = document.createElement('a')
              link.download = "screenShot"+app.forum.data.attributes.title+'.png'
              link.href = dataUrl
              link.click()
              window.canSave=true;
              m.redraw();
            node.removeChild(outerBox)
            })
            }, 100);

            
          },
        },
        window.canSave ?  app.translator.trans('tohsakarat-post-camera.lib.scan-post'): window.cameraCurProgress
      )
    );
  
  });

  
});


