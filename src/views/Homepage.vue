<template>
  <div class="container-fluid">
    <div id="carouselControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselControls" data-bs-slide-to="0" class="active" aria-current="true"
          aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselControls" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselControls" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="@/assets/images/carousel-1.jpg"
            alt="First slide" class="d-block w-100" height="400px">
        </div>
        <div class="carousel-item">
          <img src="@/assets/images/carousel-2.jpg" alt="Second slide" class="d-block w-100"
            height="400px">
        </div>
        <div class="carousel-item">
          <img src="@/assets/images/carousel-3.jpg" alt="Third slide"
            class="d-block w-100" height="400px">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row intro">
      <div class="col-sm-6">
        <div class="img-banner">
          <div class="centered-content">
            <h1></h1>
            <p class="centered-text"></p>
          </div>
        </div>
      </div>

      <div class="col-sm-6">
        <div id="demo" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <ul>
                <h3>DERMATOLOGY CLINIC</h3>
                <li>Với lịch sử gần 5 năm, <b>Dermatology Clinic</b> tự hào là bệnh viện da liễu tư nhân lớn nhất khu vực với các dịch vụ khám chữa bệnh dưới sự hỗ 
                    trợ trang thiết bị, máy móc công nghệ hiện đại và nhà thuốc đạt tiêu chuẩn có thể đáp ứng tối đa mọi nhu cầu đa dạng của khách hàng tại Cần Thơ.
                </li>
                <br>
                <li>
                  Mục tiêu của <b>Phòng khám da liễu Dermatology Clinic</b> là trở thành một trong những địa chỉ khám chữa bệnh tin cậy cho người dân tại Cần Thơ và 
                  các vùng lân cận. Chúng tôi chú trọng vào việc đầu tư trang bị y tế hiện đại, nhà thuốc đạt chuẩn kết hợp với kiến thức của đội ngũ bác sỹ giỏi nhằm 
                  đưa đến kết quả khám bệnh chính xác nhất và điều trị bệnh tốt nhất cho người dân. Đồng thời, tạo một môi trường y tế an toàn, thân thiện, chất lượng 
                  cao hơn cho tất cả mọi người.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-3">
    <div class="row intro">
      <div class="col-sm-6">
        <div id="demo" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <ul>
                <h3>TẠI SAO NÊN CHỌN CHÚNG TÔI?</h3>
                <li><b>Đội ngũ bác sĩ tay nghề cao</b></li>
                <li>Với các Tiến sĩ, Thạc sỹ, Bác sĩ chuyên khoa Da liễu. Đầy đủ chứng chỉ hành nghề và được đào tạo liên tục hàng năm cập nhật các kiến thức 
                    Da liễu - Thẫm mỹ mới nhất.
                </li>
                <br>
                <li><b>Trang thiết bị hiện đại</b></li>
                <li>
                  Trang thiết bị thẫm mỹ hiện đại như máy IPL, Laser Yag, Fotona 4D....
                </li>
                <li>
                  Trang thiết bị xét nghiệm: Máy huyết học, sinh hoá tự động, máy dị ứng, Máy PCR-RT,...
                </li>
                <br>
                <li><b>Ứng dụng công nghệ mới nhất</b></li>
                <li>
                  Chúng tôi tiên phong đi đầu trong việc ứng dụng các công nghệ mới nhất trong chăm sóc da, laser thẫm mỹ. 
                </li>
                <li>
                  Ứng dụng các kĩ thuật mới trong xét nghiệm để góp phần chẩn đoán chính xác bệnh và theo dõi quá trình điều trị. 
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="img-banner2">
          <div class="centered-content">
            <h1></h1>
            <p class="centered-text"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>@import "@/assets/css/homepage.css";</style>
