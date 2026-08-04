/**
 * 图片优化：把 src/assets/img/ 下的 PNG/JPG 限宽后转成 WebP，并删掉原图。
 *
 * 用法：npm run optimize:images
 *
 * 为什么要做：相机直出和截图动辄 1~3 MB，直接打包会让首屏在手机上转好几秒。
 * 站内图片实际显示宽度不超过 700px，留 2 倍给高清屏，1400px 已经绰绰有余。
 *
 * 新增图片后重跑一次即可，已经是 .webp 的文件会自动跳过。
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const IMG_DIR = path.join(__dirname, '..', 'src', 'assets', 'img')
const MAX_EDGE = 1400 // 最长边上限（px）
const QUALITY = 80

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`

async function main() {
  const files = fs
    .readdirSync(IMG_DIR)
    .filter((f) => /\.(png|jpe?g)$/i.test(f))

  if (files.length === 0) {
    console.log('没有需要转换的 PNG/JPG，全部已是 WebP。')
    return
  }

  let before = 0
  let after = 0

  for (const file of files) {
    const src = path.join(IMG_DIR, file)
    const dest = path.join(IMG_DIR, file.replace(/\.(png|jpe?g)$/i, '.webp'))
    const origSize = fs.statSync(src).size

    const info = await sharp(src)
      .resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: 'inside',
        withoutEnlargement: true // 本来就小的图不放大，否则反而糊
      })
      .webp({ quality: QUALITY })
      .toFile(dest)

    fs.unlinkSync(src)

    before += origSize
    after += info.size
    console.log(`${file.padEnd(12)} ${kb(origSize).padStart(8)} -> ${kb(info.size).padStart(8)}  ${path.basename(dest)}`)
  }

  const saved = (1 - after / before) * 100
  console.log('—'.repeat(46))
  console.log(`合计 ${kb(before)} -> ${kb(after)}，减少 ${saved.toFixed(0)}%`)
  console.log('\n提示：转换后记得把代码里引用的 .png / .jpg 后缀改成 .webp。')
}

main().catch((err) => {
  console.error('图片优化失败：', err)
  process.exit(1)
})
