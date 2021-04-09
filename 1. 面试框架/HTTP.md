HTTP协议(超文本传输协议HyperText Transfer Protocol)，它是基于TCP协议的应用层传输协议，简单来说就是客户端和服务端进行数据传输的一种规则。
#### HTTP请求状态行
请求行由请求Method, URL 字段和HTTP Version三部分构成, 总的来说请求行就是定义了本次请求的请求方式, 请求的地址, 以及所遵循的HTTP协议版本例如：
**GET /example.html HTTP/1.1 (CRLF)**
HTTP协议的方法有： 
GET： 请求获取Request-URI所标识的资源 
POST： 在Request-URI所标识的资源后增加新的数据 
HEAD： 请求获取由Request-URI所标识的资源的响应消息报头 
PUT： 请求服务器存储或修改一个资源，并用Request-URI作为其标识 
DELETE： 请求服务器删除Request-URI所标识的资源 
TRACE： 请求服务器回送收到的请求信息，主要用于测试或诊断 
CONNECT： 保留将来使用 OPTIONS： 请求查询服务器的性能，或者查询与资源相关的选项和需求
#### HTTP响应状态码
状态代码有三位数字组成，第一个数字定义了响应的类别，且有五种可能取值：
 1xx：指示信息 - 表示请求已接收，继续处理 
 2xx：成功 - 表示请求已被成功接收、理解、接受 
 3xx：重定向 - 要完成请求必须进行更进一步的操作 
 4xx：客户端错误 - 请求有语法错误或请求无法实现 
 5xx：服务器端错误 - 服务器未能实现合法的请求

 http缓存
 Cache-Control
 no-cache, no-store, must-revalidate, max-age, public, private	
 控制浏览器是否可以缓存资源、强制缓存校验、缓存时间
 ETag
 文件指纹（hash码、时间戳等可以标识文件是否更新）	
 强校验，根据文件内容生成精确
 Last-Modified
 请求的资源最近更新时间	弱校验，
 根据文件修改时间，可能内容未变，不精确
 Expires	
 资源缓存过期时间	
 与响应头中的 Date 对比