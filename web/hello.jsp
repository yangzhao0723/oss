<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014-11-05
  Time: 20:29
  To change this template use File | Settings | File Templates.
--%>
<%@taglib prefix="s" uri="/struts-tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<body>
<s:form   action="test"  namespace="/" method="post">
    <s:iterator value="user" >
        <s:property value="SupplierName"/>
         <s:property value="SupplierAB"/>
        </s:iterator>
</s:form>
</body>
</html>