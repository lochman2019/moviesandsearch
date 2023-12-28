<?php
// Free html5 templates : www.zerotheme.com

$text = "<span style='color:red; font-size: 35px; line-height: 40px; magin: 10px;'>Error! Please try again.</span>";

if(isset($_POST['submitcontact']))
{
	$name=$_POST['name'];
	$email=$_POST['email'];
	$message=$_POST['message'];
	$subject=$_POST['subject'];

	$to = "youremail@gmail.com";
	$subject = "Zerotheme - Testing Contact Form";
	$message = " Name: " . $name ."\r\n Email: " . $email . "\r\n Message:\r\n" . $message;
	 
	$from = "Zerotheme.com";
	$headers = "From:" . $from . "\r\n";
	$headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n"; 
	 
	if(@mail($to,$subject,$message,$headers))
	{
	  $text = "<span style='color:blue; font-size: 35px; line-height: 40px; margin: 10px;'>Your Message was sent successfully !</span>";
	}
}
?>

<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<head>

    <!-- Basic Page Needs
  ================================================== -->
	<meta charset="utf-8">
	<title>Reel Travel</title>

	
    <!-- Mobile Specific Metas
  ================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    
    <!-- CSS
  ================================================== -->
  	<link rel="stylesheet" href="css/zerogrid.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/menu.css">
	
	<!-- Custom Fonts -->
	<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<script src="js/jquery-2.1.1.js"></script>
	<script src="js/script.js"></script>

	<!--[if lt IE 8]>
       <div style=' clear: both; text-align:center; position: relative;'>
         <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home?ocid=ie6_countdown_bannercode">
           <img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0000_us.jpg" border="0" height="42" width="820" alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today." />
        </a>
      </div>
    <![endif]-->
    <!--[if lt IE 9]>
		<script src="js/html5.js"></script>
		<script src="js/css3-mediaqueries.js"></script>
	<![endif]-->
    
</head>

<body class="archive-page">
	<div class="wrap-body">
		<header>
			<div class="wrap-header" >
				<!--Top-->
				<div id="top">
					<div class="zerogrid">
						<div class="row">
							<div class="col-1-3">
								<span>Welcome To Reel Travel</span>
							</div>
							<div class="col-2-3">
								<ul class="list-inline top-link link">
									<li><a href="#">Q&A</a></li>
							    	<li><a href="#">Account </a></li>
							    	<li><a href="#">Setting</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<!---Main Header--->
				<div class="main-header">
					<div class="zerogrid">
						<div class="row">
							<div class="hero-heading">
								
								<span>Reel Travel</span>
								<div class="tl"></div>
								<div class="tr"></div>
								<div class="br"></div>
								<div class="bl"></div>
							</div>
						</div>
					</div>
				</div>
				
				<!---Top Menu--->
				<div id="cssmenu" >
					<ul>
					   <li class="active"><a href="index.html"><span>Home Page</span></a></li>
					   <li class="has-sub"><a href="#"><span>Category</span></a>
						  <ul>
							 <li class="has-sub"><a href="#"><span>by movie</span></a>
								<!-- <ul>
								   <li><a href="#"><span>Sub Item</span></a></li>
								   <li class="last"><a href="#"><span>Sub Item</span></a></li>
								</ul> -->
							 </li>

							 <li class="has-sub"><a href="#"><span>by location</span></a>
								<!-- <ul>
								   <li><a href="#"><span>Brtish</span></a></li>
								   <li class="last"><a href="#"><span>Sub Item</span></a></li>
								</ul> -->
							 </li>
						  </ul>
					   </li>
					   <li><a href="archive.html"><span>Post Collection</span></a></li>
					   <li><a href="single.html"><span>Your Footprints </span></a></li>
					   <li class="last"><a href="contact.html"><span>Contact</span></a></li>
					</ul>
				</div>
				
			</div>
		</header>

		<!--////////////////////////////////////Container-->
		<section id="container">
			<div class="wrap-container zerogrid">
				<div class="crumbs">
					<ul>
						<li><a href="index.html">Home</a></li>
						<li><a href="contact.html">Contact</a></li>
					</ul>
				</div>
				<div id="main-content">
					<div class="wrap-content" style="border-right: none">
						<div class="row">
							<h1 class="t-center" style="margin: 40px 0;color: #212121;letter-spacing: 2px;font-weight: 500;">Contact Us</h1>
							<div class="col-full">
								<div id="map" style="height: 450px;"></div>
							</div>
							<div class="col-1-3">
								<div class="wrap-col">
									<h3 style="margin: 20px 0">Contact Info</h3>
									<strong>SED UT PERSPICIATIS UNDE OMNIS ISTE NATUS ERROR SIT VOLUPTATEM ACCUSANTIUM DOLOREMQUE LAUDANTIUM, TOTAM REM APERIAM.</strong>
									<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque la udantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia.</p>
									<p>JL.Kemacetan timur no.23. block.Q3<br>
										Jakarta-Indonesia</p>
									   <p>+6221 888 888 90 <br>
										+6221 888 88891</p>
									<p>info@yourdomain.com</p>
								</div>
							</div>
							<div class="col-2-3">
								<div class="wrap-col">
									<div class="contact">
										<h3 style="margin: 20px 0 20px 30px">Contact Form</h3>
										<div id="contact_form">
											<!--Warning-->
											<center><?php echo $text;?></center>
											<!---->
											<form name="form1" id="ff" method="post" action="contact.php">
												<label class="row">
													<div class="col-1-2">
														<div class="wrap-col">
															<input type="text" name="name" id="name" placeholder="Enter name" required="required" />
														</div>
													</div>
													<div class="col-1-2">
														<div class="wrap-col">
															<input type="email" name="email" id="email" placeholder="Enter email" required="required" />
														</div>
													</div>
												</label>
												<label class="row">
													<div class="col-full">
														<div class="wrap-col">
														<input type="text" name="subject" id="subject" placeholder="Subject" required="required" />
														</div>
													</div>
												</label>
												<label class="row">
													<div class="wrap-col">
														<textarea name="message" id="message" class="form-control" rows="4" cols="25" required="required"
														placeholder="Message"></textarea>
													</div>
												</label>
												<center><input class="button button-skin" type="submit" name="submitcontact" value="Submit"></center>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!--////////////////////////////////////Footer-->
		<footer>
			<div class="zerogrid wrap-footer">
				<div class="row">
					<div class="col-2-4 col-footer-1">
						<div class="wrap-col">
							<h3 class="widget-title">About</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<ul class="quicklinks">
								<li><a href="#">Privacy Policy</a></li>
								<li><a href="#">Terms of Use</a></li>
							</ul>
						</div>
					</div>
					<div class="col-1-4 col-footer-2">
						<div class="wrap-col">
							<h3 class="widget-title">Contact Us</h3>
							<p>Call us:</p>
							<strong style="font-size: 25px;">0123-456-789</strong>
							<p>Address:</p>
							<strong>123, New Lenox Chicago, IL 60606</strong>
							<p>Email:</p>
							<strong>info@yoursite.com</strong>
						</div>
					</div>
					<div class="col-1-4 col-footer-3">
						<div class="wrap-col">
							<h3 class="widget-title">Socials</h3>
							<ul class="social-buttons">
								<li><a href="#"><i class="fa fa-twitter"></i></a></li>
								<li><a href="https://www.facebook.com/ZerothemeDotCom/"><i class="fa fa-facebook"></i></a></li>
								<li><a href="#"><i class="fa fa-linkedin"></i></a></li>
								<li><a href="#"><i class="fa fa-pinterest"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="bottom-footer">
					<div class="copyright">
						Copyright @ zHarvest - Designed by <a href="https://www.zerotheme.com" title="free website templates">ZEROTHEME</a>
					</div>
				</div>
			</div>
			
		</footer>
	</div>

	<!-- Google Map -->
	<script src="js/google-map.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB7V-mAjEzzmP6PCQda8To0ZW_o3UOCVCE&callback=initMap" async defer></script>
	
</body>
</html>