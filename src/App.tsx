import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Plus, X, Menu } from 'lucide-react';

// --- Styles for Font and Layout ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: white;
      color: black;
    }
    
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
      background: #e5e7eb;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #d1d5db;
    }
  `}</style>
);

// --- Components ---
// Logo Component
const Logo = ({ className = "" }: { className?: string }) => (
  <svg 
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="-615 0 776 701" 
    className={className}
    fill="currentColor"
  >
    <path d="M0 0 C2.51586914 1.22070312 2.51586914 1.22070312 5.03515625 2.78125 C5.99462158 3.36737061 6.95408691 3.95349121 7.94262695 4.55737305 C8.97218506 5.19843994 10.00174316 5.83950684 11.0625 6.5 C12.72781029 7.51873885 14.39315262 8.53742763 16.05986023 9.55387878 C17.2286972 10.26675054 18.39690984 10.98064688 19.56452942 11.69551086 C25.64674355 15.41356118 31.79648977 19.01324199 37.95446777 22.60394287 C47.38236177 28.10205082 56.78522657 33.63836994 66.13208008 39.2734375 C71.19488746 42.32328452 76.27011468 45.35123639 81.35546875 48.36328125 C82.0117627 48.75204941 82.66805664 49.14081757 83.34423828 49.54136658 C84.7048046 50.34726461 86.0653801 51.15314714 87.42596436 51.95901489 C88.11039612 52.36441498 88.79482788 52.76981506 89.5 53.1875 C90.52568085 53.79499588 90.52568085 53.79499588 91.57208252 54.4147644 C101.90225325 60.53613885 112.17841582 66.74050835 122.42584229 72.99920654 C131.0091833 78.23721729 139.66356763 83.32638917 148.43237305 88.24780273 C149.21523682 88.68809814 149.99810059 89.12839355 150.8046875 89.58203125 C151.47483887 89.95561768 152.14499023 90.3292041 152.83544922 90.71411133 C153.54975098 91.13845459 154.26405273 91.56279785 155 92 C156.01976236 92.52469753 157.03952473 93.04939507 158.09018898 93.58999252 C161 96 161 96 161.73828697 99.52196121 C161.76346643 100.96310112 161.755413 102.40504682 161.7215271 103.8460083 C161.72665365 104.64163516 161.7317802 105.43726202 161.7370621 106.25699878 C161.74695541 108.92638586 161.71393272 111.59351636 161.68115234 114.26269531 C161.67946013 116.17459052 161.68040945 118.08648963 161.68380737 119.99838257 C161.68553149 125.19253537 161.65021384 130.38585972 161.60836363 135.57981968 C161.5708991 141.00635662 161.56733464 146.43291179 161.56021118 151.85955811 C161.54154978 162.13732213 161.49229506 172.414704 161.43211424 182.6922996 C161.36508952 194.39223668 161.33207024 206.09219184 161.30194163 217.79227304 C161.2391973 241.86172737 161.13363694 265.93084229 161 290 C157.31816076 292.08470308 153.63569725 294.16830105 149.953125 296.25170898 C148.39875732 297.13183781 148.39875732 297.13183781 146.81298828 298.02974701 C139.58260483 302.11936086 132.32243598 306.13976644 125 310.0625 C123.04126038 311.11512975 121.08291597 312.16849529 119.125 313.22265625 C117.89136719 313.88406616 117.89136719 313.88406616 116.6328125 314.55883789 C114.52013819 315.71528415 112.42531842 316.89338274 110.33544922 318.09007263 C108.68440186 319.03548668 108.68440186 319.03548668 107 320 C107.02212303 320.63646517 107.04424606 321.27293034 107.06703949 321.92868233 C107.5988643 337.47113468 107.99502033 353.01039515 108.24349213 368.55970955 C108.36687936 376.08009095 108.53475817 383.59437618 108.81054688 391.11083984 C109.05105067 397.66880428 109.20486712 404.2223574 109.25812387 410.78460872 C109.28924448 414.25700043 109.36125514 417.7167866 109.53752136 421.18509293 C110.39123589 438.65005647 110.39123589 438.65005647 107 446 C101.19969102 452.22420343 93.57096236 455.60621317 85.81751251 458.8054657 C82.16819063 460.35266031 78.90130103 462.24982268 75.515625 464.3046875 C73.42772949 465.49592491 71.33919735 466.68604724 69.25 467.875 C68.08326202 468.54023952 66.91659785 469.20560852 65.75 469.87109375 C63.35509458 471.23714001 60.95989073 472.60266063 58.56445312 473.96777344 C53.28888953 476.97480863 48.0172894 479.98877937 42.74542236 483.00228882 C39.83299369 484.66707936 36.92042775 486.33162965 34.0078125 487.99609375 C33.43070526 488.32589737 32.85359802 488.65570099 32.25900269 488.99549866 C28.73949621 491.00661453 25.21933188 493.01657378 21.69866943 495.02566528 C9.78423855 501.82477958 -2.12188804 508.63753173 -14 515.5 C-22.94559059 520.66823143 -31.90363381 525.81416306 -40.875 530.9375 C-41.45471558 531.26860779 -42.03443115 531.59971558 -42.63171387 531.94085693 C-48.54016638 535.31521064 -54.45013089 538.68690462 -60.36167908 542.05583191 C-63.32490498 543.74476211 -66.28758312 545.43465122 -69.25 547.125 C-70.12415054 547.62370102 -70.12415054 547.62370102 -71.01596069 548.13247681 C-79.10209693 552.74769243 -87.15555079 557.4161144 -95.1875 562.125 C-104.27795581 567.45362814 -113.44575529 572.6291316 -122.65185547 577.75488281 C-130.75317578 582.27590565 -138.77512259 586.92174004 -146.77832031 591.61376953 C-154.40798976 596.08278832 -162.06984655 600.49348885 -169.75 604.875 C-170.62547989 605.37454697 -170.62547989 605.37454697 -171.51864624 605.88418579 C-174.48759504 607.57799047 -177.45702023 609.27095762 -180.42675781 610.96337891 C-186.32801689 614.32652051 -192.2269235 617.69378067 -198.125 621.0625 C-198.70536011 621.39393005 -199.28572021 621.72536011 -199.88366699 622.0668335 C-208.26841262 626.85607663 -216.6389612 631.66948791 -225 636.5 C-233.94558975 641.66823094 -242.90354844 646.81431341 -251.875 651.9375 C-252.45538025 652.26894012 -253.0357605 652.60038025 -253.63372803 652.94186401 C-258.3455141 655.63234108 -263.05811682 658.32138652 -267.77075195 661.01037598 C-271.88921585 663.36041657 -276.00735656 665.7110221 -280.125 668.0625 C-280.70321503 668.39269135 -281.28143005 668.72288269 -281.87716675 669.06307983 C-289.30951805 673.30833922 -296.73299288 677.56870069 -304.14501953 681.84936523 C-306.31538086 683.10223954 -308.48690509 684.3531018 -310.65966797 685.60180664 C-315.82637206 688.57339891 -320.97185835 691.57269709 -326.08203125 694.640625 C-327.03988525 695.20813477 -327.99773926 695.77564453 -328.98461914 696.36035156 C-330.77449997 697.42160694 -332.55685481 698.49570374 -334.32983398 699.58496094 C-335.12333252 700.05192383 -335.91683105 700.51888672 -336.734375 701 C-337.75869629 701.61875 -337.75869629 701.61875 -338.80371094 702.25 C-342.71524878 703.58573191 -345.92015092 702.49255019 -349.5793457 700.82348633 C-350.43616943 700.33130615 -351.29299316 699.83912598 -352.17578125 699.33203125 C-353.15562988 698.77572021 -354.13547852 698.21940918 -355.14501953 697.64624023 C-356.71292236 696.73853882 -356.71292236 696.73853882 -358.3125 695.8125 C-360.56625978 694.52838874 -362.82017026 693.24454191 -365.07421875 691.9609375 C-366.23625351 691.29540128 -367.39820007 690.62971104 -368.56005859 689.96386719 C-373.89457627 686.91838385 -379.26071199 683.9301193 -384.625 680.9375 C-393.542862 675.94780174 -402.44364885 670.92852656 -411.33642578 665.89428711 C-418.37975964 661.90941754 -425.43706584 657.95001133 -432.5 654 C-441.4593421 648.98940497 -450.40281974 643.95170949 -459.3359375 638.89453125 C-466.37946347 634.90963231 -473.43690717 630.95010006 -480.5 627 C-489.4593421 621.98940497 -498.40281974 616.95170949 -507.3359375 611.89453125 C-514.37946347 607.90963231 -521.43690717 603.95010006 -528.5 600 C-537.4593421 594.98940497 -546.40281974 589.95170949 -555.3359375 584.89453125 C-562.37946417 580.90963191 -569.4369774 576.95022658 -576.5 573 C-584.96597346 568.26351273 -593.42609212 563.51687276 -601.875 558.75 C-602.85017578 558.20085938 -603.82535156 557.65171875 -604.83007812 557.0859375 C-605.72919922 556.57804688 -606.62832031 556.07015625 -607.5546875 555.546875 C-608.34343262 555.10182617 -609.13217773 554.65677734 -609.94482422 554.19824219 C-611.66740346 553.19391587 -613.34090953 552.10606031 -615 551 C-615.29312925 548.34164482 -615.38858491 545.91653753 -615.35644531 543.25610352 C-615.35844153 542.4472511 -615.36043776 541.63839869 -615.36249447 540.80503559 C-615.36541802 538.07944603 -615.34668932 535.35442809 -615.328125 532.62890625 C-615.32577319 530.68132638 -615.32468911 528.73374462 -615.32478333 526.78616333 C-615.32067171 521.48463373 -615.29695695 516.18336832 -615.26771927 510.88192368 C-615.25005057 507.57197386 -615.23594344 504.26202877 -615.22311401 500.95205688 C-615.18753435 491.79241399 -615.14997732 482.63280789 -615.09617615 473.47325134 C-615.02117837 460.36434064 -614.99747499 447.25727341 -615.04715157 434.14822102 C-615.08155964 424.95959159 -615.08647518 415.7712907 -615.06873894 406.58261395 C-615.0594326 401.09500702 -615.06546776 395.60835472 -615.1072998 390.12088013 C-615.14591792 384.95888101 -615.14226919 379.7986249 -615.10632896 374.63662338 C-615.10061541 372.7426459 -615.11035731 370.84854917 -615.13669777 368.95474625 C-615.32310174 354.67710885 -615.32310174 354.67710885 -612.13963318 350.64187622 C-609.81190611 349.04892233 -607.62771361 348.00716411 -605 347 C-603.94031006 346.36384766 -602.88062012 345.72769531 -601.78881836 345.07226562 C-600.81565674 344.52248047 -599.84249512 343.97269531 -598.83984375 343.40625 C-597.72899414 342.7757373 -596.61814453 342.14522461 -595.47363281 341.49560547 C-594.89762329 341.17058044 -594.32161377 340.84555542 -593.72814941 340.51068115 C-590.62056315 338.75669244 -587.51965351 336.99095934 -584.41796875 335.2265625 C-583.7904068 334.86990509 -583.16284485 334.51324768 -582.51626587 334.14578247 C-576.5701505 330.76327792 -570.65530862 327.32823319 -564.75 323.875 C-563.77522705 323.30515381 -562.8004541 322.73530762 -561.79614258 322.14819336 C-559.83945466 321.00364205 -557.88299151 319.85870638 -555.92675781 318.71337891 C-541.55043686 310.29721103 -527.15029945 301.9239385 -512.71582031 293.60791016 C-501.4520275 287.11500122 -490.22447236 280.56057444 -479 274 C-465.59382119 266.16424334 -452.17079317 258.35962289 -438.71582031 250.60791016 C-427.4520275 244.11500122 -416.22447236 237.56057444 -405 231 C-401.04214526 228.68667962 -397.08389337 226.37404251 -393.125 224.0625 C-392.13781982 223.48604736 -391.15063965 222.90959473 -390.13354492 222.31567383 C-382.83388651 218.05798345 -375.51299394 213.83803948 -368.1875 209.625 C-359.29102939 204.50713788 -350.44353286 199.31342492 -341.625 194.0625 C-331.23961775 187.88090391 -320.78238963 181.84146782 -310.27880859 175.86401367 C-299.78334836 169.88975209 -289.34852473 163.81507116 -278.92675781 157.71337891 C-264.55043686 149.29721103 -250.15029945 140.9239385 -235.71582031 132.60791016 C-224.4520275 126.11500122 -213.22447236 119.56057444 -202 113 C-198.04214526 110.68667962 -194.08389337 108.37404251 -190.125 106.0625 C-189.13781982 105.48604736 -188.15063965 104.90959473 -187.13354492 104.31567383 C-179.83388651 100.05798345 -172.51299394 95.83803948 -165.1875 91.625 C-156.29102939 86.50713788 -147.44353286 81.31342492 -138.625 76.0625 C-128.23961775 69.88090391 -117.78238963 63.84146782 -107.27880859 57.86401367 C-96.78334836 51.88975209 -86.34852473 45.81507116 -75.92675781 39.71337891 C-70.99491937 36.8261882 -66.0604267 33.9435518 -61.125 31.0625 C-60.14490967 30.49031738 -59.16481934 29.91813477 -58.1550293 29.32861328 C-49.54326605 24.30631327 -40.91321026 19.3157503 -32.26318359 14.35961914 C-27.3988976 11.56740512 -22.55933053 8.75370733 -17.79296875 5.796875 C-16.62689087 5.08096191 -16.62689087 5.08096191 -15.43725586 4.35058594 C-14.03193656 3.4828299 -12.63474748 2.60168797 -11.24829102 1.70410156 C-6.97465206 -0.92220094 -4.80654453 -1.19511218 0 0 Z M-5 10 C-6.2375 11.0209375 -6.2375 11.0209375 -7.5 12.0625 C-9.82767647 13.86644927 -11.1441791 14.57691542 -14 15 C-14 15.66 -14 16.32 -14 17 C-15.32 17 -16.64 17 -18 17 C-18.66 17.99 -19.32 18.98 -20 20 C-21.65 20.33 -23.3 20.66 -25 21 C-24.34 24.63 -23.68 28.26 -23 32 C-22.34 32 -21.68 32 -21 32 C-21 32.66 -21 33.32 -21 34 C-20.34 34 -19.68 34 -19 34 C-19.495 35.485 -19.495 35.485 -20 37 C-19.35891863 38.67667436 -18.68528045 40.34089996 -18 42 C-17.66581472 43.43261394 -17.3552949 44.87085731 -17.0625 46.3125 C-16.26612508 50.08744251 -15.14287546 53.56083027 -13.7265625 57.14453125 C-12.71471606 59.72854769 -11.87736386 62.36790841 -11 65 C-10.67 65.66 -10.34 66.32 -10 67 C-14.52256628 65.53681679 -17.41330365 63.06363647 -21 60 C-23.71552569 58.23175071 -25.92323231 57.02558923 -29 56 C-29 55.34 -29 54.68 -29 54 C-29.99 54 -30.98 54 -32 54 C-32.33 53.01 -32.66 52.02 -33 51 C-33.99 51 -34.98 51 -36 51 C-36 50.34 -36 49.68 -36 49 C-41.49963267 44.72245181 -41.49963267 44.72245181 -48 43 C-48.66 41.68 -49.32 40.36 -50 39 C-51.65 39 -53.3 39 -55 39 C-55 39.66 -55 40.32 -55 41 C-55.99 41 -56.98 41 -58 41 C-58 41.66 -58 42.32 -58 43 C-60.475 43.495 -60.475 43.495 -63 44 C-63 44.66 -63 45.32 -63 46 C-63.804375 46.12375 -64.60875 46.2475 -65.4375 46.375 C-66.283125 46.58125 -67.12875 46.7875 -68 47 C-68.33 47.66 -68.66 48.32 -69 49 C-70.97888961 49.72693904 -72.97954558 50.39816251 -75 51 C-74.37967524 54.46485707 -74.37967524 54.46485707 -73 58 C-70.07890236 59.72269861 -68.38864211 60 -65 60 C-65.33 60.99 -65.66 61.98 -66 63 C-64.54462432 63.83848804 -63.08559627 64.67063934 -61.625 65.5 C-60.81289063 65.9640625 -60.00078125 66.428125 -59.1640625 66.90625 C-57.10663126 68.15035859 -57.10663126 68.15035859 -55 68 C-54.67 68.99 -54.34 69.98 -54 71 C-53.01 70.505 -53.01 70.505 -52 70 C-52 70.66 -52 71.32 -52 72 C-49.09451118 74.04169485 -47.59857954 75 -44 75 C-43.67 76.32 -43.34 77.64 -43 79 C-41.35 79.33 -39.7 79.66 -38 80 C-37.67 80.99 -37.34 81.98 -37 83 C-36.01 83.66 -35.02 84.32 -34 85 C-33.34 84.67 -32.68 84.34 -32 84 C-32 84.66 -32 85.32 -32 86 C-31.34 86 -30.68 86 -30 86 C-30 86.99 -30 87.98 -30 89 C-29.236875 89.103125 -28.47375 89.20625 -27.6875 89.3125 C-24.71187939 90.07370527 -24.0965041 90.9034959 -22 93 C-19.39388923 93.72197162 -19.39388923 93.72197162 -17 94 C-17 94.66 -17 95.32 -17 96 C-16.34 96 -15.68 96 -15 96 C-14.67 96.99 -14.34 97.98 -14 99 C-13.34 98.67 -12.68 98.34 -12 98 C-12 98.66 -12 99.32 -12 100 C-11.01 100 -10.02 100 -9 100 C-9 100.66 -9 101.32 -9 102 C-8.34 102 -7.68 102 -7 102 C-6.67 102.66 -6.34 103.32 -6 104 C-5.34 103.67 -4.68 103.34 -4 103 C-3.67 103.99 -3.34 104.98 -3 106 C1.47151691 109.81461393 1.47151691 109.81461393 7 111 C7 111.66 7 112.32 7 113 C8.27056525 114.68732044 8.27056525 114.68732044 10 116 C10.99 116 11.98 116 13 116 C13 116.66 13 117.32 13 118 C15.81509993 120.2773501 15.81509993 120.2773501 19 120 C19 120.99 19 121.98 19 123 C19.804375 123.28875 20.60875 123.5775 21.4375 123.875 C24 125 24 125 25 127 C26.32 127 27.64 127 29 127 C29.33 128.32 29.66 129.64 30 131 C33.3503698 130.42235003 34.68233772 129.41423154 37 127 C39.1875 125.8125 39.1875 125.8125 41 125 C41 124.34 41 123.68 41 123 C42.98 122.67 44.96 122.34 47 122 C47 121.01 47 120.02 47 119 C48.175625 118.7834375 48.175625 118.7834375 49.375 118.5625 C51.96421018 118.12201075 51.96421018 118.12201075 54 117 C54 115.68 54 114.36 54 113 C53.01 113 52.02 113 51 113 C50.67 112.01 50.34 111.02 50 110 C49.01 110 48.02 110 47 110 C46.67 109.01 46.34 108.02 46 107 C44.515 106.505 44.515 106.505 43 106 C41.515 105.505 41.515 105.505 40 105 C39.67 104.01 39.34 103.02 39 102 C36.10441559 100.5522078 34.25811062 100 31 100 C31 99.01 31 98.02 31 97 C30.01 97 29.02 97 28 97 C27.7834375 95.6696875 27.7834375 95.6696875 27.5625 94.3125 C27.08980022 91.52882354 26.56929815 88.76516243 26 86 C29.51349448 85.89961444 32.57087486 86.26518747 36 87 C37.2375 87.144375 38.475 87.28875 39.75 87.4375 C41.35875 87.7159375 41.35875 87.7159375 43 88 C43.33 88.66 43.66 89.32 44 90 C46.02333934 90.46842712 46.02333934 90.46842712 48.375 90.625 C49.56222656 90.73714844 49.56222656 90.73714844 50.7734375 90.8515625 C52.51246725 90.96749782 54.25711002 91 56 91 C56.33 91.66 56.66 92.32 57 93 C57.556875 92.79375 58.11375 92.5875 58.6875 92.375 C61.70752061 91.88526693 63.15906235 92.86362494 66 94 C68.36919633 94.29969321 70.72669648 94.49845672 73.109375 94.65625 C74.04523438 94.82640625 74.04523438 94.82640625 75 95 C75.33 95.66 75.66 96.32 76 97 C77.32 96.67 78.64 96.34 80 96 C80 96.66 80 97.32 80 98 C83.36704285 98.2295711 85.41370268 98.33943529 88.375 96.625 C89.179375 95.820625 89.179375 95.820625 90 95 C90 94.34 90 93.68 90 93 C91.32 92.67 92.64 92.34 94 92 C94 91.34 94 90.68 94 90 C94.95712891 89.83564453 94.95712891 89.83564453 95.93359375 89.66796875 C96.75988281 89.50941406 97.58617187 89.35085937 98.4375 89.1875 C99.67306641 88.96126953 99.67306641 88.96126953 100.93359375 88.73046875 C101.95646484 88.36888672 101.95646484 88.36888672 103 88 C103.33 87.01 103.66 86.02 104 85 C105.32 85 106.64 85 108 85 C108.23226189 82.73080676 108.23226189 82.73080676 105.875 80.8125 C103.0964847 78.66210711 103.0964847 78.66210711 99.6875 79.25 C98.800625 79.4975 97.91375 79.745 97 80 C97 79.01 97 78.02 97 77 C88.37061984 75.31359307 79.71919377 74.10607856 71 73 C71 72.34 71 71.68 71 71 C69.68 71.33 68.36 71.66 67 72 C66.67 71.34 66.34 70.68 66 70 C63.97479485 69.56978387 63.97479485 69.56978387 61.625 69.4375 C58.80522535 69.21246912 56.71336297 68.90445432 54 68 C53.67 67.34 53.34 66.68 53 66 C51.906875 66.020625 50.81375 66.04125 49.6875 66.0625 C46 66 46 66 43 65 C42.67 64.34 42.34 63.68 42 63 C38.54956883 61.84985628 35.64717645 61 32 61 C30.59824731 60.71522579 29.20260468 60.39956963 27.8125 60.0625 C23.54966029 59.07715508 19.34789475 58.47431579 15 58 C15.185625 56.9275 15.37125 55.855 15.5625 54.75 C16.06323638 50.73192393 16.06323638 50.73192393 15 47 C14.34 46.67 13.68 46.34 13 46 C13.495 45.01 13.495 45.01 14 44 C12.60241883 40.43616803 11.01099298 37.02325439 9.375 33.5625 C8.1223482 30.31699305 7.63373741 27.5761932 7.31640625 24.1328125 C6.74348185 20.27087766 5.34420926 16.6521912 4 13 C3.34 13 2.68 13 2 13 C2.33 11.68 2.66 10.36 3 9 C-0.44709521 7.76889457 -1.92910476 8.04579394 -5 10 Z" />
  </svg>
);

// Native Reveal Component (Replaces GSAP)
const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

const Nav = ({ setView, currentView, isMobileMenuOpen, setIsMobileMenuOpen }: any) => (
  <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-8 bg-white/95 backdrop-blur-sm transition-all duration-300">
    <div 
      className="flex items-center gap-2 cursor-pointer z-50 hover:opacity-60 transition-opacity"
      onClick={() => setView('home')}
    >
      <Logo className="w-8 h-8 md:w-10 md:h-10 text-black" />
      <span className="text-lg font-semibold tracking-tight hidden md:block">Backspace .</span>
    </div>
    
    <nav className="hidden md:flex space-x-10 text-[15px] font-medium text-gray-600">
      <button onClick={() => setView('home')} className={`hover:text-black transition-colors ${currentView === 'home' ? 'text-black' : ''}`}>Work</button>
      <button onClick={() => setView('about')} className={`hover:text-black transition-colors ${currentView === 'about' ? 'text-black' : ''}`}>About</button>
      <button onClick={() => window.location.href = "mailto:hello@backspace.company"} className="hover:text-black transition-colors">Contact</button>
    </nav>
    <button className="md:hidden z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
    {isMobileMenuOpen && (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center space-y-8 text-3xl font-medium z-40 animate-in fade-in duration-200">
        <button onClick={() => { setView('home'); setIsMobileMenuOpen(false); }}>Work</button>
        <button onClick={() => { setView('about'); setIsMobileMenuOpen(false); }}>About</button>
        <a href="mailto:hello@backspace.company">Contact</a>
      </div>
    )}
  </header>
);

const Footer = () => (
  <footer className="px-6 md:px-12 lg:px-24 py-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-gray-500 gap-6">
    <div className="flex gap-6">
      <a href="#" className="hover:text-black transition-colors">Twitter</a>
      <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
      <a href="#" className="hover:text-black transition-colors">Substack</a>
      <a href="#" className="hover:text-black transition-colors">GitHub</a>
    </div>
    <div className="flex gap-6">
      <span>© Copyright 2025</span>
    </div>
  </footer>
);

// --- Views ---
const HomeView = ({ setView }: { setView: (view: string) => void }) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const work = [
    { client: "Nexus", desc: "The intelligent enterprise knowledge base", role: "RAG Strategy" },
    { client: "Aurora", desc: "Generative design assistant for architects", role: "Product Engineering" },
    { client: "Pilot", desc: "Your AI executive co-pilot", role: "0→1 Build" },
    { client: "Vector", desc: "Autonomous supply chain logistics", role: "Computer Vision" },
    { client: "Tonic", desc: "Private recommendation engine", role: "Strategic Partner" },
    { client: "Index", desc: "Financial forecasting agent", role: "ML Ops" },
  ];

  const approach = [
    { num: "01", title: "Data Sovereignty", text: "Whether we work independently or integrate with your team, we prioritize your proprietary data. We don't just train models; we build secure data moats." },
    { num: "02", title: "High Velocity", text: "We work fast, like really fast. We move from hypothesis to inference API in weeks, zooming through explorations until we find the signal." },
    { num: "03", title: "Show and Tell", text: "We frequently share work in progress, usually in the form of live Streamlit demos or interactive prototypes. No lengthy PDFs." },
    { num: "04", title: "Bias for Action", text: "We prefer creating tangible artifacts to visualize the team's ideas over abstract strategy documents that often go ignored." },
    { num: "05", title: "Systems Thinking", text: "Whether it's a small prompt chain or an entire agent swarm, we create reusable components and evaluation frameworks." },
    { num: "06", title: "Model Agnostic", text: "We aren't married to OpenAI or Anthropic. We select the best architecture for the specific task, optimizing for cost and latency." },
  ];

  return (
    <main className="pt-32 md:pt-48 animate-in fade-in duration-500">
      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <Reveal>
          <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[1.1] font-medium tracking-tight max-w-5xl">
            Strategic AI Partner for <br />
            <span className="text-gray-400">Early-Stage Teams.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 text-lg font-medium">
              Nexus
            </div>
            <div className="md:col-span-8">
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                We help ambitious startups integrate Artificial Intelligence fast without compromising quality. From 0→1 prototypes to scalable neural architectures.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Work List */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="flex justify-between items-baseline mb-12 border-b border-gray-200 pb-4">
          <span className="text-sm font-medium text-gray-500">Selected Work</span>
        </div>
        <div className="space-y-0">
          {work.map((item, i) => (
            <div key={i} className="group flex flex-col md:flex-row md:items-baseline py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="md:w-1/4 text-xl font-medium group-hover:translate-x-2 transition-transform duration-300">{item.client}</div>
              <div className="md:w-1/2 text-lg text-gray-500 mt-1 md:mt-0">{item.desc}</div>
              <div className="md:w-1/4 text-sm text-gray-400 text-right mt-2 md:mt-0">{item.role}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-right">
          <a href="#" className="inline-flex items-center text-sm font-medium hover:opacity-60">View all projects <ArrowRight size={14} className="ml-2"/></a>
        </div>
      </section>

      {/* About Teaser */}
      <section className="px-6 md:px-12 lg:px-24 mb-32 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <span className="text-sm font-medium text-gray-500">About</span>
        </div>
        <div className="md:col-span-8">
          <Reveal>
            <p className="text-2xl md:text-3xl leading-snug font-medium mb-8">
              We help early-stage startups ship AI fast.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
              We've spent the last decade building 0→1 products for the world's top tech companies. Today, we partner with founders to bring their ideas to life. As a fractional AI partner, we will help you shape your product strategy, validate technical feasibility, and build a culture of experimentation.
            </p>
            <button onClick={() => setView('about')} className="text-lg font-medium underline decoration-gray-300 underline-offset-4 hover:decoration-black transition-all">
              Read more about our philosophy
            </button>
          </Reveal>
          <div className="mt-24 grid grid-cols-2 gap-8">
            <div>
              <span className="block text-sm text-gray-500 mb-4">Capabilities</span>
              <ul className="space-y-2 text-lg font-medium">
                <li>AI Strategy</li>
                <li>LLM Integration</li>
                <li>RAG Systems</li>
                <li>Computer Vision</li>
              </ul>
            </div>
            <div>
              <span className="block text-sm text-gray-500 mb-4">&nbsp;</span>
              <ul className="space-y-2 text-lg font-medium">
                <li>0→1 Projects</li>
                <li>Team Building</li>
                <li>Technical Due Diligence</li>
                <li>Prototyping</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="mb-16 border-b border-gray-200 pb-4">
          <span className="text-sm font-medium text-gray-500">Approach</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {approach.map((step, i) => (
            <Reveal key={i} delay={i * 0.1} className="group">
              <span className="text-xs font-mono text-gray-400 mb-4 block">{step.num}</span>
              <h3 className="text-xl font-medium mb-4 group-hover:opacity-70 transition-opacity">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {step.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-12 lg:px-24 mb-32 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <span className="text-sm font-medium text-gray-500">FAQ</span>
        </div>
        <div className="md:col-span-8">
          {[
            { q: "What is fractional AI leadership?", a: "It's having a senior AI leader on your team for a fraction of the cost of a full-time hire. We embed with your team to lead strategy and execution." },
            { q: "Why not hire a full-time ML Engineer?", a: "Senior talent is scarce and expensive. We provide immediate impact and help you hire the right full-time team when you're ready." },
            { q: "What is your pricing structure?", a: "We work on a monthly retainer or project basis. Contact us for details." }
          ].map((faq, i) => (
            <div key={i} className="border-b border-gray-200 last:border-0">
              <button 
                onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                className="flex justify-between items-center w-full py-6 text-left text-xl font-medium hover:text-gray-600 transition-colors"
              >
                {faq.q}
                <span className={`transform transition-transform duration-300 ${openAccordion === i ? "rotate-45" : "rotate-0"}`}>
                  <Plus size={20} />
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="pb-6 text-gray-600 leading-relaxed text-lg max-w-2xl">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 md:px-12 lg:px-24 mb-24 pt-24 border-t border-gray-200">
        <Reveal>
          <h2 className="text-[3rem] md:text-[5rem] font-medium leading-none mb-8 tracking-tight">
            Need an AI Partner?
          </h2>
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <p className="text-xl text-gray-600 mb-12 max-w-xl">
                We are currently prioritizing projects in FinTech, Healthcare, and Generative Media. Available in Q3 2025.
              </p>
              <a href="mailto:hello@backspace.company" className="text-2xl font-medium underline decoration-gray-300 underline-offset-8 hover:decoration-black transition-all">
                hello@backspace.company
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

const AboutView = () => {
  const playbook = [
    { title: "Start with the Problem, Not the Model", text: "Too many companies start with 'We need to use GPT-4'. We start with 'What user problem are we solving?' and work backwards to the technology. Sometimes, a simple regression is better than a Transformer." },
    { title: "Data is the Moat", text: "Models are becoming commodities. Your competitive advantage lies in your proprietary data and how you structure it. We help you build data pipelines that turn raw interactions into gold." },
    { title: "Evaluation Driven Development", text: "You can't improve what you don't measure. We implement rigorous evaluation frameworks (LLM-as-a-Judge, RAGAS) early in the process to ensure reliability and reduce hallucinations." },
    { title: "Human in the Loop", text: "AI is probabilistic, not deterministic. We design interfaces that empower humans to correct and refine model outputs, creating a flywheel of continuous improvement." }
  ];

  const experience = [
    { company: "Backspace", role: "Founder", year: "Present", desc: "Strategic AI Partner for early-stage startups." },
    { company: "DeepMind", role: "Research Engineer", year: "2020-2023", desc: "Worked on reinforcement learning for robotics." },
    { company: "OpenAI", role: "Technical Staff", year: "2018-2020", desc: "Contributed to early GPT infrastructure." },
    { company: "Google Brain", role: "Interaction Designer", year: "2015-2018", desc: "Visualizing neural network internals." },
  ];

  return (
    <main className="pt-32 md:pt-48 animate-in fade-in duration-500 bg-white min-h-screen">
      {/* About Hero */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <Reveal>
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.2] font-medium tracking-tight max-w-4xl text-gray-900 mb-12">
            I'm Backspace, an AI research collective helping founders build the future.
          </h1>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Previously, I helped build the foundations of generative media at <span className="text-black font-medium">DeepMind</span> and <span className="text-black font-medium">OpenAI</span>. I've launched products used by millions and published research at NeurIPS.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                Now, I leverage that experience to help early-stage companies navigate the noise of the AI boom. I bridge the gap between academic research and shipping production code.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-4">
            <div className="w-full h-64 bg-gray-200 rounded-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop" 
                alt="Abstract AI Art" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <span className="text-xs text-gray-400 mt-2 block">Latent space visualization, 2024</span>
          </div>
        </div>
      </section>

      {/* Playbook */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-sm font-medium text-gray-500 mb-16 uppercase tracking-wide">The Backspace Playbook</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-12">
            {playbook.map((item, i) => (
              <Reveal key={i} className="md:col-span-6">
                <h3 className="text-2xl font-medium mb-4">{item.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-sm font-medium text-gray-500 mb-12 uppercase tracking-wide">Experience</h2>
          <div className="space-y-0">
            {experience.map((job, i) => (
              <div key={i} className="group flex flex-col md:flex-row md:items-start py-8 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="md:w-1/4 text-xl font-medium">{job.company}</div>
                <div className="md:w-1/2">
                  <div className="text-xl text-gray-900 mb-2">{job.role}</div>
                  <p className="text-gray-500 text-lg">{job.desc}</p>
                </div>
                <div className="md:w-1/4 text-right text-gray-400 mt-4 md:mt-0">{job.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Bottom */}
      <section className="px-6 md:px-12 lg:px-24 mb-24">
        <div className="bg-gray-50 p-12 md:p-24 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">Ready to build?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">We only take on 3 partners a year to ensure deep focus and impact.</p>
          <a href="mailto:hello@backspace.company" className="inline-block border border-black px-8 py-4 text-lg font-medium hover:bg-black hover:text-white transition-all">
            Get in touch
          </a>
        </div>
      </section>
    </main>
  );
};

// --- Main App Wrapper ---
export default function BackspacePortfolio() {
  const [currentView, setCurrentView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="min-h-screen selection:bg-black selection:text-white">
      <GlobalStyles />
      <Nav 
        setView={setCurrentView} 
        currentView={currentView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {currentView === 'home' ? <HomeView setView={setCurrentView} /> : <AboutView />}
      <Footer />
    </div>
  );
}

