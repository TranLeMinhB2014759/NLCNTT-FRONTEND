<template>
  <!-- Footer -->
  <footer class="text-center text-lg-start bg-light text-muted">
    <section class="footer">
      <div class="container text-start mt-5">
        <div class="row mt-3">
          <div class="col-12 col-lg-4 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">
              DERMATOLOGY CLINIC
            </h6>
            <p class="border border-dark border-bottom"></p>
            <p>
              Địa chỉ: Thới Bình 1, phường Thuận An, quận Thốt Nốt, Cần Thơ
            </p>
          </div>
          <div class="col-12 col-lg-4">
            <h6 class="text-uppercase fw-bold mb-4">
              BẢN ĐỒ
            </h6>
            <p class="border border-dark border-bottom"></p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.54322138751166!2d105.7774838929546!3d10.042292373065493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a088033140c98f%3A0x1b5c63ca23376b92!2zVGjhu5tpIEJpbmgsIE5pbmggS2nhu4F1LCBD4bqnbiBUaMahLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1711362400375!5m2!1svi!2s"
              width="400" height="200" style="border:0;" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allow="geolocation">
            </iframe>
          </div>
          <div class="col-12 col-lg-4 mx-auto mb-md-0 mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">Liên Hệ</h6>
            <p class="border border-dark border-bottom"></p>
            <p><i class="fas fa-home me-3"></i>Khu II - Đại học Cần Thơ</p>
            <p>
              <i class="fas fa-envelope me-3"></i>
              minhb2014759@student.ctu.edu.vn
            </p>
            <p><i class="fas fa-phone me-3"></i> (+84) 939111333</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Copyright -->
    <div class="text-center copyright p-4">
      <p class="copyright-text">Copyright &copy; 2024 All Rights Reserved by
        <a href="#">Master Minh</a>.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 10px;
  color: #333;
  background: #41a4ff;
}

.copyright {
  background: rgb(39, 73, 203);
  background: linear-gradient(0deg, rgba(39, 73, 203, 1) 0%, rgba(41, 157, 255, 1) 45%, rgba(64, 164, 255, 1) 98%, rgba(0, 0, 0, 1) 100%);
}

.dvtv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;

}

.dvtv div {
  flex: 1;
  text-align: center;
}

.dvtv img {
  width: 60%;
  height: auto;
  margin-right: 10px;
}

@media only screen and (max-width: 575px) {
    iframe {
      width: 315px;
      height: 150px;
      margin-bottom: 10px;
    }
}
</style>