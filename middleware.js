// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const isLoggedIn = request.cookies.has('auth_token'); 

//   if (!isLoggedIn && request.url.includes('/Dashboard')) {
    
//     return NextResponse.redirect(new URL('/pages/home', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/Dashboard/:path*'],
// };
import { NextResponse } from 'next/server';

export function middleware(request) {
  // ตรวจสอบว่า cookie มี 'auth_token' หรือไม่
  const isLoggedIn = request.cookies.has('auth_token'); 

  // หากไม่ login และเข้าถึง /Dashboard ให้รีไดเร็กต์ไปหน้า /home
  if (!isLoggedIn && request.url.includes('/Dashboard')) {
    return NextResponse.redirect(new URL('/pages/home', request.url)); // เปลี่ยนเส้นทางไปหน้า home
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Dashboard/:path*'], // เฉพาะเส้นทางที่เริ่มต้นด้วย /Dashboard
};

