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
###  什么是浏览器缓存？  
    浏览器缓存其实就是浏览器保存通过HTTP获取的所有资源,是浏览器将网络资源存储在本地的一种行为。
    ![https://segmentfault.com/img/remote/1460000017962417?w=449&h=327]
#### 缓存的资源去哪里了?
    1. memory cache : 将资源缓存到内存当中。
    MemoryCache顾名思义，就是将资源缓存到内存中，等待下次访问时不需要重新下载资源，而直接从内存中获取。Webkit早已支持memoryCache。
    目前Webkit资源分成两类，一类是主资源，比如HTML页面，或者下载项，一类是派生资源，比如HTML页面中内嵌的图片或者脚本链接，分别对应代码中两个类：MainResourceLoader和SubresourceLoader。虽然Webkit支持memoryCache，但是也只是针对派生资源，它对应的类为CachedResource，用于保存原始数据（比如CSS，JS等），以及解码过的图片数据。
    2. disk cache :
##### 不同点
|  memory cache    | disk cache  |
|  ----  | ----  |
|  相同点  | 只能存储一些派生类资源文件  | 只能存储一些派生类资源文件  |
| 不同点  | 退出进程时数据会被清除 | 退出进程时数据不会被清除 |
| 存储资源  | 一般脚本、字体、图片会存在内存当中 | 一般非脚本会存在内存当中，如css等|
    
 http缓存
 Cache-Control
 no-cache, no-store, must-revalidate, max-age, public, private	
 控制浏览器是否可以缓存资源、强制缓存校验、缓存时间
 ETag
 文件指纹（hash码、时间戳等可以标识文件是否更新）	
 强校验，根据文件内容生成精确
        如果缓存中有ETag 令牌，客户端请求时会自动在“If-None-Match” HTTP 请求标头内提供 ETag 令牌。
        服务器根据当前资源核对令牌，验证是否发生变化，将验证结果通知给客户端，客户端根据结果看看是否需要从缓存中读取还是发送资源请求。

 Last-Modified
 请求的资源最近更新时间	弱校验，
 根据文件修改时间，可能内容未变，不精确
 Expires	
 资源缓存过期时间	
 与响应头中的 Date 对比