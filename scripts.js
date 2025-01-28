document.addEventListener("DOMContentLoaded", () => {
  var iconContainer = document.querySelector("#icon-mode");

  if (!iconContainer) {
      console.error("#icon-mode element not found!");
      return;
  }

  var icon = iconContainer.querySelector("img");

  // テーマを適用する関数
  function applyTheme(theme) {
      if (theme === "dark") {
          document.body.classList.add("dark-mode");
          icon.src = "./bau/img/moon.png"; // ダークモード用アイコン
      } else {
          document.body.classList.remove("dark-mode");
          icon.src = "./bau/img/moon.png"; // ライトモード用アイコン
      }
  }

  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme || "light");

  // コンテナクリック時の処理
  iconContainer.addEventListener("click", () => {
      const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired");
});




// ----------------------------clock
function updateTime() {
var now = luxon.DateTime.local();
var hours = now.hour;
var minutes = now.minute;
var seconds = now.second;
var date = now.toFormat('LLLL dd yyyy'); // fmt 
var timezone = now.zoneName; 
var clockElement = document.getElementById('clock');
var dateElement = document.getElementById('date');
var timezoneElement = document.getElementById('timezone');

var timeString = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds) ;

clockElement.textContent = timeString;
dateElement.textContent = date;

var timeZoneAbbreviation = getTimeZoneAbbreviation(timezone);

timezoneElement.textContent = "(" + timeZoneAbbreviation + ")";
}

updateTime();

setInterval(updateTime, 1000);

function formatTime(time) {
return (time < 10) ? '0' + time : time;
}

function getTimeZoneAbbreviation(timezone) {
var timeZoneAbbreviations = {
"Asia/Tokyo": "JST", 
"Asia/Shanghai": "CST",
"Asia/Kolkata": "IST", 
"Asia/Bangkok": "ICT", 
"Asia/Dubai": "GST", 
"Asia/Seoul": "KST",
"Asia/Singapore": "SGT", 
"Asia/Taipei": "CST", 
"Asia/Hong_Kong": "HKT",
"America/Los_Angeles": "PST", 
"America/New_York": "EST", 
"Europe/London": "GMT",
"Europe/Paris": "CET",
"Europe/Berlin": "CET",

};
return timeZoneAbbreviations[timezone] || timezone;
}


// ---------------------------------------------------------------count

const startDate = new Date(1720, 12, 1); // 1720年12月1日
const today = new Date();
const timeDifference = today.getTime() - startDate.getTime();
const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365)); 
const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)); 
const resultElement = document.getElementById('result');
resultElement.textContent = years + " years + " + days + " days";



// ---------------------------------------------------------------modal
// モーダル要素とモーダル内の画像・キャプションを取得
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalCaption = document.getElementById("modal-caption");

// 既存の .gallery-container 内の画像にイベントを追加
const galleryItems = document.querySelectorAll(".gallery-container .gallery-item");
galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
        modal.classList.add("open");
        modalImage.src = item.src; // クリックした画像をモーダルに表示
        modalCaption.textContent = item.getAttribute("data-caption") || ""; // データ属性からキャプションを取得
    });
});

// 新しく追加した .thumbs-container 内の画像にイベントを追加
const thumbItems = document.querySelectorAll(".thumbs-container .picsinthumbs");
thumbItems.forEach((item) => {
    item.addEventListener("click", () => {
        modal.classList.add("open");
        modalImage.src = item.src; // クリックした画像をモーダルに表示
        modalCaption.textContent = item.getAttribute("data-caption") || ""; // データ属性からキャプションを取得
    });
});

// モーダルをクリックすると閉じる処理
modal.addEventListener("click", () => {
    modal.classList.remove("open");
    modalImage.src = ""; // モーダル画像をリセット（オプション）
    modalCaption.textContent = ""; // キャプションをリセット
});



// ---------------------------------------------------------------logo rotate

document.addEventListener('DOMContentLoaded', function () {
  const contentElements = document.querySelectorAll('.leftside, .gallery-container, .calendar-container');
  const logoElements = document.querySelectorAll('.logoA, .logoB, .logoC');

  // Initial rotation values for logos
  const initialRotationMap = {
    logoA: 0,   // Start at 0 degrees
    logoB: 90,  // Start at 90 degrees
    logoC: 0,  // Start at 45 degrees
  };

  // 各コンテンツ要素に対してスクロールイベントを適用
  contentElements.forEach(function (contentsElement) {
    contentsElement.addEventListener('scroll', function () {
      console.log('Scrolling:', contentsElement); // デバッグ用
      updateRotation(contentsElement); // スクロールイベント発生時に回転処理を実行
    });
  });

  // ロゴがクリックされたときに非表示にする
  logoElements.forEach(function (logoElement) {
    logoElement.addEventListener('click', function () {
      hideLogo(logoElement);
    });

    // Set initial rotation for each logo
    const logoClass = Array.from(logoElement.classList).find(cls => initialRotationMap[cls]);
    if (logoClass) {
      const initialRotation = initialRotationMap[logoClass];
      logoElement.style.transform = `rotate(${initialRotation}deg)`;
    }
  });

  // スクロール時にロゴを回転させる関数
  function updateRotation(contentsElement) {
    let scrollPosition = 0, maxScroll = 0;

    if (
      contentsElement.classList.contains('leftside') || 
      contentsElement.classList.contains('calendar-container')
    ) {
      // 縦スクロール
      scrollPosition = contentsElement.scrollTop;
      maxScroll = contentsElement.scrollHeight - contentsElement.clientHeight;
    } else if (contentsElement.classList.contains('gallery-container')) {
      // 横スクロール
      scrollPosition = contentsElement.scrollLeft;
      maxScroll = contentsElement.scrollWidth - contentsElement.clientWidth;
    } else {
      // 未定義の要素の場合は警告を出して処理を中断
      console.warn('No matching class for scroll behavior:', contentsElement);
      return;
    }

    // ロゴごとに異なる最大回転角度を設定
    const maxRotationMap = {
      logoA: 30, 
      logoB: 260, 
      logoC: 280, 
    };

    // スクロール量に基づいて回転角度を計算し、ロゴごとに適用
    logoElements.forEach(function (logoElement) {
      if (logoElement) {
        const logoClass = Array.from(logoElement.classList).find(cls => maxRotationMap[cls]);
        if (logoClass) {
          const maxRotation = maxRotationMap[logoClass];
          const initialRotation = initialRotationMap[logoClass] || 0;
          const rotation = maxScroll > 0 ? (scrollPosition / maxScroll) * maxRotation : 0;

          // Combine initial rotation with calculated rotation
          logoElement.style.transform = `rotate(${initialRotation + rotation}deg)`;
        }
      }
    });
  }

  // ロゴを非表示にする関数
  function hideLogo(logoElement) {
    if (logoElement) {
      logoElement.style.transition = 'opacity 0.3s'; // アニメーションを加える
      logoElement.style.opacity = '0'; // ロゴを透明にする
      setTimeout(function () {
        logoElement.style.display = 'none'; // 完全に非表示にする
      }, 300); // アニメーション時間と同じ300ms後にdisplay: noneを適用
    }
  }
});







document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".details").forEach((el) => {
    const summary = el.querySelector(".summary");
    const answer = el.querySelector(".answer");
    const p = el.querySelector(".section-txtbox p");

    // 初期表示で2行に制限
    p.style.display = "-webkit-box";

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // アコーディオンを閉じる
      if (el.hasAttribute("open")) {
        const closingAnim = answer.animate(closingAnimation(answer), animTiming);

        closingAnim.onfinish = () => {
          el.removeAttribute("open");
          // 2行制限を再適用
          p.style.display = "-webkit-box";
        };
      } else {
        // アコーディオンを開く
        el.setAttribute("open", "true");
        const openingAnim = answer.animate(openingAnimation(answer), animTiming);

        openingAnim.onfinish = () => {
          // 全文表示を適用
          p.style.display = "block";
        };
      }
    });
  });
});

// アニメーションのタイミング設定
const animTiming = {
  duration: 300,
  easing: "ease-in-out",
};

// アコーディオンを閉じるときのキーフレーム
const closingAnimation = (answer) => [
  {
    height: answer.offsetHeight + "px",
    opacity: 1,
  },
  {
    height: "calc(2 * 1.2em)", // 2行分の高さ
    opacity: 1,
  },
  {
    height: 0,
    opacity: 0,
  },
];

// アコーディオンを開くときのキーフレーム
const openingAnimation = (answer) => [
  {
    height: 0,
    opacity: 0,
  },
  {
    height: "calc(2 * 1.2em)", // 2行分の高さ
    opacity: 1,
  },
  {
    height: answer.scrollHeight + "px",
    opacity: 1,
  },
];
