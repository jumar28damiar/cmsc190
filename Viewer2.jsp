<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="/birt.tld" prefix="birt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<body bgcolor="#cccccc">


<birt:viewer id="birttViewer2"
reportDesign="Sub.rptdesign"
format="html" 
scrolling="true" 
style="height:1000px;width:100%"
pattern="preview"
isHostPage="false">

</birt:viewer> 


</body>
</html>

<!-- 
http://127.0.0.1:8080/birt-viewer/preview?__report=C%3A%5Capache-tomcat-7.0.82%5Cwebapps%5Cbirt-viewer%5CSub.rptdesign&__format=html&__svg=true&__locale=en_PH&__timezone=CTT&__masterpage=true&__rtl=false&__cubememsize=10&__resourceFolder=C%3A%5Capache-tomcat-7.0.82%5Cwebapps%5Cbirt-viewer&__emitterid=org.eclipse.birt.report.engine.emitter.html&-734436226&watershedName=aborlan
 -->