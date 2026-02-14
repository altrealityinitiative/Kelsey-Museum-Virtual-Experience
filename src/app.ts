declare const XR8: any;

import imageTarget0869 from "../image-targets/0869_Inscription_target.json";
import imageTarget0878 from "../image-targets/0878_Inscription_target.json";
import imageTargetAugustus from "../image-targets/Augustus_target.json";
import imageTargetCoin from "../image-targets/Coin_target.json";
import imageTargetInscription from "../image-targets/Inscription_target.json";
import imageTargetJackal from "../image-targets/Jackal_target.json";

const onxrloaded = () => {
  XR8.XrController.configure({
    imageTargetData: [imageTarget0869, imageTarget0878, imageTargetAugustus, imageTargetCoin, imageTargetInscription, imageTargetJackal],
  });
};

window.XR8 ? onxrloaded() : window.addEventListener("xrloaded", onxrloaded);
