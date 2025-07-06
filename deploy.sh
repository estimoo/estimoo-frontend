#!/bin/bash

# Estimoo Frontend Deploy Script
# Bu script frontend'i build eder ve nginx ile deploy eder

set -e  # Hata durumunda script'i durdur

echo "🚀 Estimoo Frontend Deploy Başlıyor..."

# Renkli output için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Log fonksiyonu
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Node.js kontrolü
log "Node.js versiyonu kontrol ediliyor..."
if ! command -v node &> /dev/null; then
    error "Node.js bulunamadı! Lütfen Node.js'i yükleyin."
fi

if ! command -v npm &> /dev/null; then
    error "npm bulunamadı! Lütfen npm'i yükleyin."
fi

NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
log "Node.js: $NODE_VERSION, npm: $NPM_VERSION"

# Dependencies kontrolü
log "Dependencies kontrol ediliyor..."
if [ ! -d "node_modules" ]; then
    log "node_modules bulunamadı, dependencies yükleniyor..."
    npm install
else
    log "Dependencies güncelleniyor..."
    npm install
fi

# Build işlemi
log "Frontend build ediliyor..."
npm run build

if [ ! -d "dist" ]; then
    error "Build başarısız! dist klasörü oluşturulamadı."
fi

# Nginx kontrolü
log "Nginx kontrol ediliyor..."
if ! command -v nginx &> /dev/null; then
    error "Nginx bulunamadı! Lütfen nginx'i yükleyin: sudo apt install nginx"
fi

# Nginx konfigürasyonu kopyalama
log "Nginx konfigürasyonu kopyalanıyor..."
NGINX_CONF="/etc/nginx/sites-available/estimoo.co"
NGINX_ENABLED="/etc/nginx/sites-enabled/estimoo.co"

# Root kullanıcı kontrolü
if [ "$EUID" -ne 0 ]; then
    warning "Nginx konfigürasyonu için sudo gerekli!"
    echo "Lütfen aşağıdaki komutları manuel olarak çalıştırın:"
    echo "sudo cp nginx.conf $NGINX_CONF"
    echo "sudo ln -sf $NGINX_CONF $NGINX_ENABLED"
    echo "sudo nginx -t"
    echo "sudo systemctl reload nginx"
else
    # Nginx konfigürasyonunu kopyala
    cp nginx.conf "$NGINX_CONF"
    ln -sf "$NGINX_CONF" "$NGINX_ENABLED"
    
    # Nginx syntax kontrolü
    log "Nginx konfigürasyonu test ediliyor..."
    if nginx -t; then
        success "Nginx konfigürasyonu geçerli!"
    else
        error "Nginx konfigürasyonu hatalı!"
    fi
fi

# Web dizini oluşturma
WEB_DIR="/var/www/estimoo-frontend"
log "Web dizini hazırlanıyor: $WEB_DIR"

if [ "$EUID" -ne 0 ]; then
    warning "Web dizini oluşturma için sudo gerekli!"
    echo "Lütfen aşağıdaki komutları manuel olarak çalıştırın:"
    echo "sudo mkdir -p $WEB_DIR"
    echo "sudo cp -r dist/* $WEB_DIR/"
    echo "sudo chown -R www-data:www-data $WEB_DIR"
    echo "sudo chmod -R 755 $WEB_DIR"
else
    # Web dizinini oluştur ve dosyaları kopyala
    mkdir -p "$WEB_DIR"
    cp -r dist/* "$WEB_DIR/"
    
    # İzinleri ayarla
    chown -R www-data:www-data "$WEB_DIR"
    chmod -R 755 "$WEB_DIR"
    
    success "Web dosyaları kopyalandı ve izinler ayarlandı!"
fi

# Nginx servisini yeniden başlat
if [ "$EUID" -ne 0 ]; then
    warning "Nginx yeniden başlatma için sudo gerekli!"
    echo "Lütfen aşağıdaki komutu manuel olarak çalıştırın:"
    echo "sudo systemctl reload nginx"
else
    log "Nginx yeniden başlatılıyor..."
    systemctl reload nginx
    success "Nginx yeniden başlatıldı!"
fi

# SSL sertifikası kontrolü
log "SSL sertifikası kontrol ediliyor..."
if [ -f "/etc/letsencrypt/live/estimoo.co/fullchain.pem" ]; then
    success "SSL sertifikası mevcut!"
else
    warning "SSL sertifikası bulunamadı!"
    echo "SSL sertifikası için şu komutu çalıştırın:"
    echo "sudo certbot --nginx -d estimoo.co -d www.estimoo.co"
fi

# Deploy tamamlandı
echo ""
success "🎉 Estimoo Frontend Deploy Tamamlandı!"
echo ""
echo "📋 Deploy Özeti:"
echo "   • Frontend build edildi"
echo "   • Nginx konfigürasyonu güncellendi"
echo "   • Web dosyaları kopyalandı"
echo "   • Nginx yeniden başlatıldı"
echo ""
echo "🌐 Erişim:"
echo "   • HTTP:  http://estimoo.co"
echo "   • HTTPS: https://estimoo.co (SSL varsa)"
echo ""
echo "🔧 Manuel İşlemler (sudo gerekli):"
if [ "$EUID" -ne 0 ]; then
    echo "   • sudo cp nginx.conf /etc/nginx/sites-available/estimoo.co"
    echo "   • sudo ln -sf /etc/nginx/sites-available/estimoo.co /etc/nginx/sites-enabled/"
    echo "   • sudo mkdir -p /var/www/estimoo-frontend"
    echo "   • sudo cp -r dist/* /var/www/estimoo-frontend/"
    echo "   • sudo chown -R www-data:www-data /var/www/estimoo-frontend"
    echo "   • sudo systemctl reload nginx"
    echo "   • sudo certbot --nginx -d estimoo.co -d www.estimoo.co"
fi
echo ""
echo "📊 Loglar:"
echo "   • Nginx Access: /var/log/nginx/estimoo.access.log"
echo "   • Nginx Error: /var/log/nginx/estimoo.error.log"
echo "" 