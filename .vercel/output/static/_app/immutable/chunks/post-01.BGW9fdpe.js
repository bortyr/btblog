import{s as Vs,j as cn,n as Ps,a as gn,u as _n,g as wn,d as xn,b as Ss,f as rn}from"./scheduler.DamSiY5E.js";import{S as Hs,i as Ns,e as D,c as i,j as h,b as a,d as e,u as Rs,v as $s,A as js,B as Ms,C as zs,D as Is,s as c,H as W,t as bn,p as Dn,g as d,a as r,E as Q,f as vn,h as Bn,k as An}from"./index.DjKXAdKE.js";import{g as Fn,a as yn}from"./spread.CgU5AtxT.js";function On(C){let l,y;return{c(){l=D("img"),this.h()},l(o){l=i(o,"IMG",{src:!0,alt:!0,loading:!0}),this.h()},h(){cn(l.src,y=C[0])||h(l,"src",y),h(l,"alt",C[1]),h(l,"loading","lazy")},m(o,t){a(o,l,t)},p(o,[t]){t&1&&!cn(l.src,y=o[0])&&h(l,"src",y),t&2&&h(l,"alt",o[1])},i:Ps,o:Ps,d(o){o&&e(l)}}}function kn(C,l,y){let{src:o}=l,{alt:t}=l;return C.$$set=p=>{"src"in p&&y(0,o=p.src),"alt"in p&&y(1,t=p.alt)},[o,t]}class Cn extends Hs{constructor(l){super(),Ns(this,l,kn,On,Vs,{src:0,alt:1})}}function Ln(C){let l;const y=C[1].default,o=gn(y,C,C[0],null);return{c(){o&&o.c()},l(t){o&&o.l(t)},m(t,p){o&&o.m(t,p),l=!0},p(t,[p]){o&&o.p&&(!l||p&1)&&_n(o,y,t,t[0],l?xn(y,t[0],p,null):wn(t[0]),null)},i(t){l||(Rs(o,t),l=!0)},o(t){$s(o,t),l=!1},d(t){o&&o.d(t)}}}function Tn(C,l,y){let{$$slots:o={},$$scope:t}=l;return C.$$set=p=>{"$$scope"in p&&y(0,t=p.$$scope)},[t,o]}class Rn extends Hs{constructor(l){super(),Ns(this,l,Tn,Ln,Vs,{})}}function $n(C){let l,y=`Recently I got into CNN based object detectors in computer vision for my master’s thesis and I was wondering whenever I could
work on this project in Rust. Here are my findings on how to load YOLOv4 object detector into a Rust program using OpenCV library.`,o,t,p,u,S="YOLO as Object Detector",J,K,X,E,Us=`For object detection model I went for the popular YOLO detectors. Choosing a particular version might not be as easy as just
choosing the one with highest version number. After version v3, the project was abandoned by the original author and since the name
name wasn’t trademarked, different interested parties have appropriated the title. This is topic however, is worthy of a separate article.`,Z,ss,ns,g,qs=`I have gone for the YOLOv4 since it was the last one created on the darknet framework. The original darknet repository has
been abandoned but a forked and currently maintained version can be found <a href="https://github.com/hank-ai/darknet" rel="nofollow">here</a>.`,es,as,ls,_,Gs=`To perform detection with YOLO model you need a configuration file which describes the architecture of the model. You also need a
.weights file which are crucial for the network to performs predictions based on input images.`,os,ts,ps,w,Ws=`You can find there great tutorials on how to train your own YOLO model. For purpose of this tutorial, I will use pre-trained
MS-COCO weights and the default yolov4-tiny.cfg (both can be found in darknet repository).`,cs,rs,Ds,x,Qs='<li><a href="https://github.com/hank-ai/darknet/blob/master/cfg/yolov4-tiny.cfg" rel="nofollow">yolov4-tiny.cfg</a></li> <li><a href="https://github.com/hank-ai/darknet/issues/21#issuecomment-1807480542" rel="nofollow">yolov4-tiny.weights</a><br/> <br/></li>',is,m,Js="Load YOLO",ys,Cs,ds,b,Ks=`To load the model I will use the OpenCV library and it’s deep neural networks (dnn) module. Since it’s written in C++, Rust library
with bindings is needed. Fortunely for us, there is actively maintained project called <a href="https://github.com/twistedfall/opencv-rust" rel="nofollow">opencv-rust</a>.
I recommend going through the repository readme on installation and common trouble shooting in case of errors.`,us,ms,fs,v,Xs=`With that out of the way, we can jump straight to code. Do a quick <code>cargo init</code> and put both cfg <code>yolov4-tiny.cfg</code> and <code>yolov4-tiny.weights</code>
inside your project’s directory. Open <code>src/main.rs</code> in your favourite editor and let’s go.`,hs,Es,gs,B,Zs=`First we need to import our OpenCV library. From CLI you can do <code>cargo add opencv</code>. Also worth adding <code>cargo add anyhow</code> to handle results easier and
<code>cargo add itertools</code>.
The authors have broken up the lib into modules so we need to point at the ones
we need. Mainly dnn but also core for some OpenCV specific types etc. Then in main we can load up
the YOLO using dnn’s read_net function i.e:`,_s,j,un=`<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#569CD6">use</span><span style="color:#4EC9B0"> anyhow</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Result</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#569CD6">use</span><span style="color:#4EC9B0"> itertools</span><span style="color:#D4D4D4">::izip</span></span>
<span class="line"><span style="color:#569CD6">use</span><span style="color:#4EC9B0"> opencv</span><span style="color:#D4D4D4">::&#123;core, dnn, highgui, imgcodecs, imgproc, </span><span style="color:#4EC9B0">prelude</span><span style="color:#D4D4D4">::*&#125;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">fn</span><span style="color:#DCDCAA"> main</span><span style="color:#D4D4D4">() -> </span><span style="color:#4EC9B0">Result</span><span style="color:#D4D4D4">&#x3C;()> &#123;</span></span>
<span class="line"><span style="color:#6A9955">    // Setup model based on YOLOv4 config and weights</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> config</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">"yolov4-tiny.cfg"</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> weights</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">"yolov4-tiny.weights"</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> net</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">dnn</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">read_net</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">weights</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">config</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">"Darknet"</span><span style="color:#D4D4D4">)?;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#569CD6"> mut</span><span style="color:#9CDCFE"> model</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">dnn</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">DetectionModel</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">new_1</span><span style="color:#D4D4D4">(&#x26;</span><span style="color:#9CDCFE">net</span><span style="color:#D4D4D4">)?;</span></span></code><button class="copy" data-code="use anyhow::Result;
use itertools::izip
use opencv::&#123;core, dnn, highgui, imgcodecs, imgproc, prelude::*&#125;;

fn main() -> Result<()> &#123;
    // Setup model based on YOLOv4 config and weights
    let config = &#x22;yolov4-tiny.cfg&#x22;;
    let weights = &#x22;yolov4-tiny.weights&#x22;;
    let net = dnn::read_net(weights, config, &#x22;Darknet&#x22;)?;
    let mut model = dnn::DetectionModel::new_1(&#x26;net)?;" onclick="
          navigator.clipboard.writeText(this.dataset.code);
          this.classList.add(&#x27;copied&#x27;);
          setTimeout(() => this.classList.remove(&#x27;copied&#x27;), 3000)
        "><span class="ready"></span><span class="success"></span></button></pre>`,M,A,sn="Now the model has been marked as mutable because we will need to specify some parameters that are required for prediction.",ws,z,mn=`<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> scale</span><span style="color:#D4D4D4">: </span><span style="color:#4EC9B0">f64</span><span style="color:#D4D4D4"> = </span><span style="color:#B5CEA8">1.0</span><span style="color:#D4D4D4"> / </span><span style="color:#B5CEA8">255.0</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> size</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Size</span><span style="color:#D4D4D4"> &#123;</span></span>
<span class="line"><span style="color:#9CDCFE">        width</span><span style="color:#D4D4D4">: </span><span style="color:#B5CEA8">416</span><span style="color:#D4D4D4">,</span></span>
<span class="line"><span style="color:#9CDCFE">        height</span><span style="color:#D4D4D4">: </span><span style="color:#B5CEA8">416</span><span style="color:#D4D4D4">,</span></span>
<span class="line"><span style="color:#D4D4D4">    &#125;;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> mean</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Scalar</span><span style="color:#D4D4D4"> &#123;</span></span>
<span class="line"><span style="color:#B5CEA8">        0</span><span style="color:#D4D4D4">: [</span><span style="color:#B5CEA8">0.0</span><span style="color:#D4D4D4">, </span><span style="color:#B5CEA8">0.0</span><span style="color:#D4D4D4">, </span><span style="color:#B5CEA8">0.0</span><span style="color:#D4D4D4">, </span><span style="color:#B5CEA8">0.0</span><span style="color:#D4D4D4">], </span><span style="color:#6A9955">// Generally for YOLO</span></span>
<span class="line"><span style="color:#D4D4D4">    &#125;;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> swap_rb</span><span style="color:#D4D4D4">: </span><span style="color:#4EC9B0">bool</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">true</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> crop</span><span style="color:#D4D4D4">: </span><span style="color:#4EC9B0">bool</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">false</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#9CDCFE">    model</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set_input_params</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">scale</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">size</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">mean</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">swap_rb</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">crop</span><span style="color:#D4D4D4">)?;</span></span></code><button class="copy" data-code="    let scale: f64 = 1.0 / 255.0;
    let size = core::Size &#123;
        width: 416,
        height: 416,
    &#125;;
    let mean = core::Scalar &#123;
        0: [0.0, 0.0, 0.0, 0.0], // Generally for YOLO
    &#125;;
    let swap_rb: bool = true;
    let crop: bool = false;
    model.set_input_params(scale, size, mean, swap_rb, crop)?;" onclick="
          navigator.clipboard.writeText(this.dataset.code);
          this.classList.add(&#x27;copied&#x27;);
          setTimeout(() => this.classList.remove(&#x27;copied&#x27;), 3000)
        "><span class="ready"></span><span class="success"></span></button></pre>`,I,F,nn=`The model is now ready to perform prediction. Quick note: by default, the model will do inference(prediction) using CPU.
To use GPU you would need to set the backend and target parameter in model similarly to those above.`,xs,O,en="To store detections we need OpenCV specific types.",bs,V,fn=`<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">    // Vecs to store detections</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#569CD6"> mut</span><span style="color:#9CDCFE"> class_ids</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Vector</span><span style="color:#D4D4D4">::&#x3C;</span><span style="color:#4EC9B0">i32</span><span style="color:#D4D4D4">>::</span><span style="color:#DCDCAA">new</span><span style="color:#D4D4D4">();</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#569CD6"> mut</span><span style="color:#9CDCFE"> confidences</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Vector</span><span style="color:#D4D4D4">::&#x3C;</span><span style="color:#4EC9B0">f32</span><span style="color:#D4D4D4">>::</span><span style="color:#DCDCAA">new</span><span style="color:#D4D4D4">();</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#569CD6"> mut</span><span style="color:#9CDCFE"> boxes</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Vector</span><span style="color:#D4D4D4">::&#x3C;</span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Rect</span><span style="color:#D4D4D4">>::</span><span style="color:#DCDCAA">new</span><span style="color:#D4D4D4">();    </span></span></code><button class="copy" data-code="    // Vecs to store detections
    let mut class_ids = core::Vector::<i32>::new();
    let mut confidences = core::Vector::<f32>::new();
    let mut boxes = core::Vector::<core::Rect>::new();    " onclick="
          navigator.clipboard.writeText(this.dataset.code);
          this.classList.add(&#x27;copied&#x27;);
          setTimeout(() => this.classList.remove(&#x27;copied&#x27;), 3000)
        "><span class="ready"></span><span class="success"></span></button></pre>`,H,k,an=`Now we are ready to perform detections! Let’s load an image as the input to YOLO the object detector and perform detections.
I’ll take this standard picture of dog as an example.`,vs,L,Bs,N,hn=`<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#6A9955">    // Open img</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> img_file</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">"img.jpg"</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#569CD6"> mut</span><span style="color:#9CDCFE"> img</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">imgcodecs</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">imread_def</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">img_file</span><span style="color:#D4D4D4">)?;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955">    // Perform detections</span></span>
<span class="line"><span style="color:#9CDCFE">    model</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">detect_def</span><span style="color:#D4D4D4">(&#x26;</span><span style="color:#9CDCFE">img</span><span style="color:#D4D4D4">, &#x26;</span><span style="color:#569CD6">mut</span><span style="color:#9CDCFE"> class_ids</span><span style="color:#D4D4D4">, &#x26;</span><span style="color:#569CD6">mut</span><span style="color:#9CDCFE"> confidences</span><span style="color:#D4D4D4">, &#x26;</span><span style="color:#569CD6">mut</span><span style="color:#9CDCFE"> boxes</span><span style="color:#D4D4D4">)?;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955">    // Put bounding boxes on the img</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> color</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Scalar</span><span style="color:#D4D4D4"> &#123;</span></span>
<span class="line"><span style="color:#B5CEA8">        0</span><span style="color:#D4D4D4">: [</span><span style="color:#B5CEA8">0.0</span><span style="color:#D4D4D4">, </span><span style="color:#B5CEA8">140.0</span><span style="color:#D4D4D4">, </span><span style="color:#B5CEA8">255.0</span><span style="color:#D4D4D4">, </span><span style="color:#B5CEA8">0.0</span><span style="color:#D4D4D4">], </span><span style="color:#6A9955">// Orange</span></span>
<span class="line"><span style="color:#D4D4D4">    &#125;;</span></span>
<span class="line"><span style="color:#C586C0">    for</span><span style="color:#D4D4D4"> (</span><span style="color:#9CDCFE">_cid</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">_cf</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">b</span><span style="color:#D4D4D4">) </span><span style="color:#569CD6">in</span><span style="color:#DCDCAA"> izip!</span><span style="color:#D4D4D4">(&#x26;</span><span style="color:#9CDCFE">class_ids</span><span style="color:#D4D4D4">, &#x26;</span><span style="color:#9CDCFE">confidences</span><span style="color:#D4D4D4">, &#x26;</span><span style="color:#9CDCFE">boxes</span><span style="color:#D4D4D4">) &#123;</span></span>
<span class="line"><span style="color:#4EC9B0">        imgproc</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">rectangle_def</span><span style="color:#D4D4D4">(&#x26;</span><span style="color:#569CD6">mut</span><span style="color:#9CDCFE"> img</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">b</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">color</span><span style="color:#D4D4D4">)?;</span></span>
<span class="line"><span style="color:#D4D4D4">    &#125;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955">    // Display in a GUI window</span></span>
<span class="line"><span style="color:#4EC9B0">    highgui</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">named_window</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">"YOLOv4"</span><span style="color:#D4D4D4">, </span><span style="color:#4EC9B0">highgui</span><span style="color:#D4D4D4">::WINDOW_FULLSCREEN)?;</span></span>
<span class="line"><span style="color:#4EC9B0">    highgui</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">imshow</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">"YOLOv4"</span><span style="color:#D4D4D4">, &#x26;</span><span style="color:#9CDCFE">img</span><span style="color:#D4D4D4">)?;</span></span>
<span class="line"><span style="color:#4EC9B0">    highgui</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">wait_key_def</span><span style="color:#D4D4D4">()?;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#4EC9B0">    Ok</span><span style="color:#D4D4D4">(())</span></span>
<span class="line"><span style="color:#D4D4D4">&#125;</span></span></code><button class="copy" data-code="    // Open img
    let img_file = &#x22;img.jpg&#x22;;
    let mut img = imgcodecs::imread_def(img_file)?;

    // Perform detections
    model.detect_def(&#x26;img, &#x26;mut class_ids, &#x26;mut confidences, &#x26;mut boxes)?;

    // Put bounding boxes on the img
    let color = core::Scalar &#123;
        0: [0.0, 140.0, 255.0, 0.0], // Orange
    &#125;;
    for (_cid, _cf, b) in izip!(&#x26;class_ids, &#x26;confidences, &#x26;boxes) &#123;
        imgproc::rectangle_def(&#x26;mut img, b, color)?;
    &#125;

    // Display in a GUI window
    highgui::named_window(&#x22;YOLOv4&#x22;, highgui::WINDOW_FULLSCREEN)?;
    highgui::imshow(&#x22;YOLOv4&#x22;, &#x26;img)?;
    highgui::wait_key_def()?;

    Ok(())
&#125;" onclick="
          navigator.clipboard.writeText(this.dataset.code);
          this.classList.add(&#x27;copied&#x27;);
          setTimeout(() => this.classList.remove(&#x27;copied&#x27;), 3000)
        "><span class="ready"></span><span class="success"></span></button></pre>`,U,T,Ys,R,As,$,ln=`The weights and configuration that we have used here i.e yolov4-tiny.cfg and it’s default weights, have been trained on MS-COCO
and the 80 classes (object names). As you might have noticed, I have omitted displaying class id to make this easier and quicker.
For further implementation, if you would like to continue with MS-COCO, you would need to load the <a href="https://github.com/hank-ai/darknet/blob/master/cfg/coco.names" rel="nofollow">names of classess</a>
and match the class id with it’s respective counterpard in the file. From that you would get matching id to dog, car etc.
Additionally, you could also display the confidence in detection scoure, i.e how sure the network is in 0-100% that the object detected
is indeed the one it predicts.`,Fs,Y,on="Now that model is loaded, true fun can begin and you can build on top of that.",Os,f,tn="Full Code",ks,P,pn='<a href="https://github.com/bortyr/yolo-rust-tutorial" rel="nofollow">https://github.com/bortyr/yolo-rust-tutorial</a>',Ls,q,En=`<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code><span class="line"><span style="color:#569CD6">use</span><span style="color:#4EC9B0"> anyhow</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Result</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#569CD6">use</span><span style="color:#4EC9B0"> itertools</span><span style="color:#D4D4D4">::izip;</span></span>
<span class="line"><span style="color:#569CD6">use</span><span style="color:#4EC9B0"> opencv</span><span style="color:#D4D4D4">::&#123;core, dnn, highgui, imgcodecs, imgproc, </span><span style="color:#4EC9B0">prelude</span><span style="color:#D4D4D4">::*&#125;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">fn</span><span style="color:#DCDCAA"> main</span><span style="color:#D4D4D4">() -> </span><span style="color:#4EC9B0">Result</span><span style="color:#D4D4D4">&#x3C;()> &#123;</span></span>
<span class="line"><span style="color:#6A9955">    // Setup model based on YOLOv4 config and weights</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> config</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">"yolov4-tiny.cfg"</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> weights</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">"yolov4-tiny.weights"</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> net</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">dnn</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">read_net</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">weights</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">config</span><span style="color:#D4D4D4">, </span><span style="color:#CE9178">"Darknet"</span><span style="color:#D4D4D4">)?;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#569CD6"> mut</span><span style="color:#9CDCFE"> model</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">dnn</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">DetectionModel</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">new_1</span><span style="color:#D4D4D4">(&#x26;</span><span style="color:#9CDCFE">net</span><span style="color:#D4D4D4">)?;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> scale</span><span style="color:#D4D4D4">: </span><span style="color:#4EC9B0">f64</span><span style="color:#D4D4D4"> = </span><span style="color:#B5CEA8">1.0</span><span style="color:#D4D4D4"> / </span><span style="color:#B5CEA8">255.0</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> size</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Size</span><span style="color:#D4D4D4"> &#123;</span></span>
<span class="line"><span style="color:#9CDCFE">        width</span><span style="color:#D4D4D4">: </span><span style="color:#B5CEA8">416</span><span style="color:#D4D4D4">,</span></span>
<span class="line"><span style="color:#9CDCFE">        height</span><span style="color:#D4D4D4">: </span><span style="color:#B5CEA8">416</span><span style="color:#D4D4D4">,</span></span>
<span class="line"><span style="color:#D4D4D4">    &#125;;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> mean</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Scalar</span><span style="color:#D4D4D4"> &#123;</span></span>
<span class="line"><span style="color:#B5CEA8">        0</span><span style="color:#D4D4D4">: [</span><span style="color:#B5CEA8">0.0</span><span style="color:#D4D4D4">, </span><span style="color:#B5CEA8">0.0</span><span style="color:#D4D4D4">, </span><span style="color:#B5CEA8">0.0</span><span style="color:#D4D4D4">, </span><span style="color:#B5CEA8">0.0</span><span style="color:#D4D4D4">], </span><span style="color:#6A9955">// Generally for YOLO</span></span>
<span class="line"><span style="color:#D4D4D4">    &#125;;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> swap_rb</span><span style="color:#D4D4D4">: </span><span style="color:#4EC9B0">bool</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">true</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> crop</span><span style="color:#D4D4D4">: </span><span style="color:#4EC9B0">bool</span><span style="color:#D4D4D4"> = </span><span style="color:#569CD6">false</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#9CDCFE">    model</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set_input_params</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">scale</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">size</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">mean</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">swap_rb</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">crop</span><span style="color:#D4D4D4">)?;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955">    // Vecs to store detections</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#569CD6"> mut</span><span style="color:#9CDCFE"> class_ids</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Vector</span><span style="color:#D4D4D4">::&#x3C;</span><span style="color:#4EC9B0">i32</span><span style="color:#D4D4D4">>::</span><span style="color:#DCDCAA">new</span><span style="color:#D4D4D4">();</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#569CD6"> mut</span><span style="color:#9CDCFE"> confidences</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Vector</span><span style="color:#D4D4D4">::&#x3C;</span><span style="color:#4EC9B0">f32</span><span style="color:#D4D4D4">>::</span><span style="color:#DCDCAA">new</span><span style="color:#D4D4D4">();</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#569CD6"> mut</span><span style="color:#9CDCFE"> boxes</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Vector</span><span style="color:#D4D4D4">::&#x3C;</span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Rect</span><span style="color:#D4D4D4">>::</span><span style="color:#DCDCAA">new</span><span style="color:#D4D4D4">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955">    // Open img</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> img_file</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">"img.jpg"</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#569CD6"> mut</span><span style="color:#9CDCFE"> img</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">imgcodecs</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">imread_def</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">img_file</span><span style="color:#D4D4D4">)?;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955">    // Perform detections</span></span>
<span class="line"><span style="color:#9CDCFE">    model</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">detect_def</span><span style="color:#D4D4D4">(&#x26;</span><span style="color:#9CDCFE">img</span><span style="color:#D4D4D4">, &#x26;</span><span style="color:#569CD6">mut</span><span style="color:#9CDCFE"> class_ids</span><span style="color:#D4D4D4">, &#x26;</span><span style="color:#569CD6">mut</span><span style="color:#9CDCFE"> confidences</span><span style="color:#D4D4D4">, &#x26;</span><span style="color:#569CD6">mut</span><span style="color:#9CDCFE"> boxes</span><span style="color:#D4D4D4">)?;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955">    // Put bounding boxes on the img</span></span>
<span class="line"><span style="color:#569CD6">    let</span><span style="color:#9CDCFE"> color</span><span style="color:#D4D4D4"> = </span><span style="color:#4EC9B0">core</span><span style="color:#D4D4D4">::</span><span style="color:#4EC9B0">Scalar</span><span style="color:#D4D4D4"> &#123;</span></span>
<span class="line"><span style="color:#B5CEA8">        0</span><span style="color:#D4D4D4">: [</span><span style="color:#B5CEA8">0.0</span><span style="color:#D4D4D4">, </span><span style="color:#B5CEA8">140.0</span><span style="color:#D4D4D4">, </span><span style="color:#B5CEA8">255.0</span><span style="color:#D4D4D4">, </span><span style="color:#B5CEA8">0.0</span><span style="color:#D4D4D4">], </span><span style="color:#6A9955">// Orange</span></span>
<span class="line"><span style="color:#D4D4D4">    &#125;;</span></span>
<span class="line"><span style="color:#C586C0">    for</span><span style="color:#D4D4D4"> (</span><span style="color:#9CDCFE">_cid</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">_cf</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">b</span><span style="color:#D4D4D4">) </span><span style="color:#569CD6">in</span><span style="color:#DCDCAA"> izip!</span><span style="color:#D4D4D4">(&#x26;</span><span style="color:#9CDCFE">class_ids</span><span style="color:#D4D4D4">, &#x26;</span><span style="color:#9CDCFE">confidences</span><span style="color:#D4D4D4">, &#x26;</span><span style="color:#9CDCFE">boxes</span><span style="color:#D4D4D4">) &#123;</span></span>
<span class="line"><span style="color:#4EC9B0">        imgproc</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">rectangle_def</span><span style="color:#D4D4D4">(&#x26;</span><span style="color:#569CD6">mut</span><span style="color:#9CDCFE"> img</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">b</span><span style="color:#D4D4D4">, </span><span style="color:#9CDCFE">color</span><span style="color:#D4D4D4">)?;</span></span>
<span class="line"><span style="color:#D4D4D4">    &#125;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955">    // Display in a GUI window</span></span>
<span class="line"><span style="color:#4EC9B0">    highgui</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">named_window</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">"YOLOv4"</span><span style="color:#D4D4D4">, </span><span style="color:#4EC9B0">highgui</span><span style="color:#D4D4D4">::WINDOW_FULLSCREEN)?;</span></span>
<span class="line"><span style="color:#4EC9B0">    highgui</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">imshow</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">"YOLOv4"</span><span style="color:#D4D4D4">, &#x26;</span><span style="color:#9CDCFE">img</span><span style="color:#D4D4D4">)?;</span></span>
<span class="line"><span style="color:#4EC9B0">    highgui</span><span style="color:#D4D4D4">::</span><span style="color:#DCDCAA">wait_key_def</span><span style="color:#D4D4D4">()?;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#4EC9B0">    Ok</span><span style="color:#D4D4D4">(())</span></span>
<span class="line"><span style="color:#D4D4D4">&#125;</span></span></code><button class="copy" data-code="use anyhow::Result;
use itertools::izip;
use opencv::&#123;core, dnn, highgui, imgcodecs, imgproc, prelude::*&#125;;

fn main() -> Result<()> &#123;
    // Setup model based on YOLOv4 config and weights
    let config = &#x22;yolov4-tiny.cfg&#x22;;
    let weights = &#x22;yolov4-tiny.weights&#x22;;
    let net = dnn::read_net(weights, config, &#x22;Darknet&#x22;)?;
    let mut model = dnn::DetectionModel::new_1(&#x26;net)?;
    let scale: f64 = 1.0 / 255.0;
    let size = core::Size &#123;
        width: 416,
        height: 416,
    &#125;;
    let mean = core::Scalar &#123;
        0: [0.0, 0.0, 0.0, 0.0], // Generally for YOLO
    &#125;;
    let swap_rb: bool = true;
    let crop: bool = false;
    model.set_input_params(scale, size, mean, swap_rb, crop)?;

    // Vecs to store detections
    let mut class_ids = core::Vector::<i32>::new();
    let mut confidences = core::Vector::<f32>::new();
    let mut boxes = core::Vector::<core::Rect>::new();

    // Open img
    let img_file = &#x22;img.jpg&#x22;;
    let mut img = imgcodecs::imread_def(img_file)?;

    // Perform detections
    model.detect_def(&#x26;img, &#x26;mut class_ids, &#x26;mut confidences, &#x26;mut boxes)?;

    // Put bounding boxes on the img
    let color = core::Scalar &#123;
        0: [0.0, 140.0, 255.0, 0.0], // Orange
    &#125;;
    for (_cid, _cf, b) in izip!(&#x26;class_ids, &#x26;confidences, &#x26;boxes) &#123;
        imgproc::rectangle_def(&#x26;mut img, b, color)?;
    &#125;

    // Display in a GUI window
    highgui::named_window(&#x22;YOLOv4&#x22;, highgui::WINDOW_FULLSCREEN)?;
    highgui::imshow(&#x22;YOLOv4&#x22;, &#x26;img)?;
    highgui::wait_key_def()?;

    Ok(())
&#125;" onclick="
          navigator.clipboard.writeText(this.dataset.code);
          this.classList.add(&#x27;copied&#x27;);
          setTimeout(() => this.classList.remove(&#x27;copied&#x27;), 3000)
        "><span class="ready"></span><span class="success"></span></button></pre>`,G,Ts;return L=new Cn({props:{src:"post-01-img01.jpg",alt:"image_of_dog"}}),R=new Cn({props:{src:"post-01-img02.png",alt:"image_of_dog"}}),{c(){l=D("p"),l.textContent=y,o=c(),t=D("br"),p=c(),u=D("h3"),u.textContent=S,J=c(),K=D("br"),X=c(),E=D("p"),E.textContent=Us,Z=c(),ss=D("br"),ns=c(),g=D("p"),g.innerHTML=qs,es=c(),as=D("br"),ls=c(),_=D("p"),_.textContent=Gs,os=c(),ts=D("br"),ps=c(),w=D("p"),w.textContent=Ws,cs=c(),rs=D("br"),Ds=c(),x=D("ul"),x.innerHTML=Qs,is=c(),m=D("h3"),m.textContent=Js,ys=c(),Cs=D("br"),ds=c(),b=D("p"),b.innerHTML=Ks,us=c(),ms=D("br"),fs=c(),v=D("p"),v.innerHTML=Xs,hs=c(),Es=D("br"),gs=c(),B=D("p"),B.innerHTML=Zs,_s=c(),j=new W(!1),M=c(),A=D("p"),A.textContent=sn,ws=c(),z=new W(!1),I=c(),F=D("p"),F.textContent=nn,xs=c(),O=D("p"),O.textContent=en,bs=c(),V=new W(!1),H=c(),k=D("p"),k.textContent=an,vs=c(),js(L.$$.fragment),Bs=c(),N=new W(!1),U=c(),T=D("p"),Ys=bn(`This should create a GUI window with the input image and bounding boxes acquired from running the model, drawn on it.
`),js(R.$$.fragment),As=c(),$=D("p"),$.innerHTML=ln,Fs=c(),Y=D("p"),Y.textContent=on,Os=c(),f=D("h3"),f.textContent=tn,ks=c(),P=D("p"),P.innerHTML=pn,Ls=c(),q=new W(!1),G=Dn(),this.h()},l(s){l=i(s,"P",{"data-svelte-h":!0}),d(l)!=="svelte-53lfr7"&&(l.textContent=y),o=r(s),t=i(s,"BR",{}),p=r(s),u=i(s,"H3",{id:!0,"data-svelte-h":!0}),d(u)!=="svelte-1cu28tn"&&(u.textContent=S),J=r(s),K=i(s,"BR",{}),X=r(s),E=i(s,"P",{"data-svelte-h":!0}),d(E)!=="svelte-ixwi2w"&&(E.textContent=Us),Z=r(s),ss=i(s,"BR",{}),ns=r(s),g=i(s,"P",{"data-svelte-h":!0}),d(g)!=="svelte-fvaoep"&&(g.innerHTML=qs),es=r(s),as=i(s,"BR",{}),ls=r(s),_=i(s,"P",{"data-svelte-h":!0}),d(_)!=="svelte-lxu8e0"&&(_.textContent=Gs),os=r(s),ts=i(s,"BR",{}),ps=r(s),w=i(s,"P",{"data-svelte-h":!0}),d(w)!=="svelte-wiv8y8"&&(w.textContent=Ws),cs=r(s),rs=i(s,"BR",{}),Ds=r(s),x=i(s,"UL",{"data-svelte-h":!0}),d(x)!=="svelte-hlh6ag"&&(x.innerHTML=Qs),is=r(s),m=i(s,"H3",{id:!0,"data-svelte-h":!0}),d(m)!=="svelte-fbomwj"&&(m.textContent=Js),ys=r(s),Cs=i(s,"BR",{}),ds=r(s),b=i(s,"P",{"data-svelte-h":!0}),d(b)!=="svelte-1hzjf4f"&&(b.innerHTML=Ks),us=r(s),ms=i(s,"BR",{}),fs=r(s),v=i(s,"P",{"data-svelte-h":!0}),d(v)!=="svelte-144gnsw"&&(v.innerHTML=Xs),hs=r(s),Es=i(s,"BR",{}),gs=r(s),B=i(s,"P",{"data-svelte-h":!0}),d(B)!=="svelte-1wqwtgb"&&(B.innerHTML=Zs),_s=r(s),j=Q(s,!1),M=r(s),A=i(s,"P",{"data-svelte-h":!0}),d(A)!=="svelte-1s8yz4m"&&(A.textContent=sn),ws=r(s),z=Q(s,!1),I=r(s),F=i(s,"P",{"data-svelte-h":!0}),d(F)!=="svelte-1tq6337"&&(F.textContent=nn),xs=r(s),O=i(s,"P",{"data-svelte-h":!0}),d(O)!=="svelte-1q1e0rw"&&(O.textContent=en),bs=r(s),V=Q(s,!1),H=r(s),k=i(s,"P",{"data-svelte-h":!0}),d(k)!=="svelte-xkrqye"&&(k.textContent=an),vs=r(s),Ms(L.$$.fragment,s),Bs=r(s),N=Q(s,!1),U=r(s),T=i(s,"P",{});var n=vn(T);Ys=Bn(n,`This should create a GUI window with the input image and bounding boxes acquired from running the model, drawn on it.
`),Ms(R.$$.fragment,n),n.forEach(e),As=r(s),$=i(s,"P",{"data-svelte-h":!0}),d($)!=="svelte-v3jdc9"&&($.innerHTML=ln),Fs=r(s),Y=i(s,"P",{"data-svelte-h":!0}),d(Y)!=="svelte-u9nvbf"&&(Y.textContent=on),Os=r(s),f=i(s,"H3",{id:!0,"data-svelte-h":!0}),d(f)!=="svelte-131vqvd"&&(f.textContent=tn),ks=r(s),P=i(s,"P",{"data-svelte-h":!0}),d(P)!=="svelte-8wufi7"&&(P.innerHTML=pn),Ls=r(s),q=Q(s,!1),G=Dn(),this.h()},h(){h(u,"id","yolo-as-object-detector"),h(m,"id","load-yolo"),j.a=M,z.a=I,V.a=H,N.a=U,h(f,"id","full-code"),q.a=G},m(s,n){a(s,l,n),a(s,o,n),a(s,t,n),a(s,p,n),a(s,u,n),a(s,J,n),a(s,K,n),a(s,X,n),a(s,E,n),a(s,Z,n),a(s,ss,n),a(s,ns,n),a(s,g,n),a(s,es,n),a(s,as,n),a(s,ls,n),a(s,_,n),a(s,os,n),a(s,ts,n),a(s,ps,n),a(s,w,n),a(s,cs,n),a(s,rs,n),a(s,Ds,n),a(s,x,n),a(s,is,n),a(s,m,n),a(s,ys,n),a(s,Cs,n),a(s,ds,n),a(s,b,n),a(s,us,n),a(s,ms,n),a(s,fs,n),a(s,v,n),a(s,hs,n),a(s,Es,n),a(s,gs,n),a(s,B,n),a(s,_s,n),j.m(un,s,n),a(s,M,n),a(s,A,n),a(s,ws,n),z.m(mn,s,n),a(s,I,n),a(s,F,n),a(s,xs,n),a(s,O,n),a(s,bs,n),V.m(fn,s,n),a(s,H,n),a(s,k,n),a(s,vs,n),zs(L,s,n),a(s,Bs,n),N.m(hn,s,n),a(s,U,n),a(s,T,n),An(T,Ys),zs(R,T,null),a(s,As,n),a(s,$,n),a(s,Fs,n),a(s,Y,n),a(s,Os,n),a(s,f,n),a(s,ks,n),a(s,P,n),a(s,Ls,n),q.m(En,s,n),a(s,G,n),Ts=!0},p:Ps,i(s){Ts||(Rs(L.$$.fragment,s),Rs(R.$$.fragment,s),Ts=!0)},o(s){$s(L.$$.fragment,s),$s(R.$$.fragment,s),Ts=!1},d(s){s&&(e(l),e(o),e(t),e(p),e(u),e(J),e(K),e(X),e(E),e(Z),e(ss),e(ns),e(g),e(es),e(as),e(ls),e(_),e(os),e(ts),e(ps),e(w),e(cs),e(rs),e(Ds),e(x),e(is),e(m),e(ys),e(Cs),e(ds),e(b),e(us),e(ms),e(fs),e(v),e(hs),e(Es),e(gs),e(B),e(_s),j.d(),e(M),e(A),e(ws),z.d(),e(I),e(F),e(xs),e(O),e(bs),V.d(),e(H),e(k),e(vs),e(Bs),N.d(),e(U),e(T),e(As),e($),e(Fs),e(Y),e(Os),e(f),e(ks),e(P),e(Ls),e(G),q.d()),Is(L,s),Is(R)}}}function Yn(C){let l,y;const o=[C[0],dn];let t={$$slots:{default:[$n]},$$scope:{ctx:C}};for(let p=0;p<o.length;p+=1)t=Ss(t,o[p]);return l=new Rn({props:t}),{c(){js(l.$$.fragment)},l(p){Ms(l.$$.fragment,p)},m(p,u){zs(l,p,u),y=!0},p(p,[u]){const S=u&1?Fn(o,[u&1&&yn(p[0]),u&0&&yn(dn)]):{};u&2&&(S.$$scope={dirty:u,ctx:p}),l.$set(S)},i(p){y||(Rs(l.$$.fragment,p),y=!0)},o(p){$s(l.$$.fragment,p),y=!1},d(p){Is(l,p)}}}const dn={title:"YOLOv4 in Rust using OpenCV's Deep Neural Networks",date:"2024-3-30",published:!0};function Pn(C,l,y){return C.$$set=o=>{y(0,l=Ss(Ss({},l),rn(o)))},l=rn(l),[l]}class zn extends Hs{constructor(l){super(),Ns(this,l,Pn,Yn,Vs,{})}}export{zn as default,dn as metadata};
