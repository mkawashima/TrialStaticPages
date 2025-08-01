// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// PC画面でのサイドバー開閉制御
function initializeSidebar() {
  const drawerToggle = document.getElementById('my-drawer');
  const body = document.body;
  
  if (!drawerToggle) return;
  
  // PC画面でのハンバーガーメニュークリック時の処理
  function handleDrawerToggle() {
    if (window.innerWidth >= 1024) { // lg breakpoint
      if (drawerToggle.checked) {
        body.classList.add('lg:drawer-open');
      } else {
        body.classList.remove('lg:drawer-open');
      }
    }
  }
  
  // ページ読み込み時の初期状態設定
  if (window.innerWidth >= 1024) {
    body.classList.add('lg:drawer-open');
    drawerToggle.checked = true;
  }
  
  // 既存のイベントリスナーを削除してから新しく追加
  drawerToggle.removeEventListener('change', handleDrawerToggle);
  drawerToggle.addEventListener('change', handleDrawerToggle);
  
  // ウィンドウリサイズ時の処理
  window.removeEventListener('resize', handleResize);
  window.addEventListener('resize', handleResize);
  
  function handleResize() {
    if (window.innerWidth >= 1024) {
      // PC画面では現在の状態を維持
      handleDrawerToggle();
    } else {
      // モバイル画面では標準のdrawer動作
      body.classList.remove('lg:drawer-open');
    }
  }
}

// 初期読み込み時とTurboページ遷移時の両方で実行
document.addEventListener('DOMContentLoaded', initializeSidebar);
document.addEventListener('turbo:load', initializeSidebar);
