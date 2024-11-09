<?php

class hasieraOrria{
    public static function hasierakoOrria(){?>
      <div id="carouselExampleIndicators" class="carousel slide z-2">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <!-- Banner argazkiak hemen -->
        <div class="carousel-inner"></div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <!-- Bilaketa filtroa -->
      <div id="filtroa">
        <select>
          <option selected>--Opzio bat aukeratu--</option>
          <option>Prezioa: txikienetik handienera</option>
          <option>Prezioa: handienetik txikienera</option>
        </select>
        
        <select>
            <option>--Eragin bat aukeratu--</option>
            <option>Adidas</option>
            <option>Nike</option>
        </select>
        <!-- Range input-a hemen -->
        <!-- Bilaketa barra hemen -->
      </div>
      <div id="produktuak">
        <!-- Produktuak hemen -->
      </div>
        <?php
    }
}