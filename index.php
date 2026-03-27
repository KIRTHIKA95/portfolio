



        <?php
include 'functions.php';
// Connect to MySQL
$pdo = pdo_connect_mysql();
// MySQL query that selects all the images
$stmt = $pdo->query('SELECT * FROM groupes_2025  ');
$groupes = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<?=template_header('Gallery')?>
         <main >
          <div class="grid">
          
         
        <?php foreach ($groupes as $groupe): ?>
		
		<a href="https://2025.mmibut1.org/S1/<?=$groupe['url']?>" target="_blank">
            <div class="card">
              <div class="content">
                <div class="front" 
                style="background-image:linear-gradient(88deg,rgba(238, 232, 194, 0.91), rgba(<?=$groupe['color'] ?>,0.54));
                " >
                 
                <?php if (file_exists($groupe['img'])): ?>
			    <img src="<?=$groupe['img']?>"   >
          <?php else : ?>
            <img src="images/iut.png"   >
			         <?php endif; ?>
                </div>
                <div class="back">
                 <h3>Groupe <?=$groupe['group']?></h3>
                 <p><?=$groupe['sujet']?></p>
                 <span><?=$groupe['nom']?></span>
               
                </div>
            </div>
        </div>
		</a>
	
		<?php endforeach; ?>

           

          </div>
      </main>
      
      <?=template_footer()?>













