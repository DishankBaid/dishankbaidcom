const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

// This Solution is just using JS to follow circle along the cursor
// document.addEventListener("mousemove", (e) => {
//   const circle = document.querySelector(".mini-circle");
//   circle.style.left = `${e.clientX}px`;
//   circle.style.top = `${e.clientY}px`;
// });

//This is same thing doen using GSAP with litle transition time
// document.addEventListener("mousemove", function (e) {
//   gsap.to(".mini-circle", {
//     x: e.clientX,
//     y: e.clientY,
//     duration: 0.2, // Duration of the animation
//     ease: "power2.out", // Easing function for smooth movement
//   });
// });

document.addEventListener("mousemove", (e) => {
  document.querySelector(
    ".mini-circle"
  ).style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
});

function firstPageAnimation() {
  let tl = gsap.timeline();
  tl.from(".navbar", {
    y: "30",
    duration: 1,
    delay: 1,
    opacity: 0,
    ease: Expo.easeInOut,
    stagger: 0.2,
  })
    .from(".bounding-element", {
      y: "150",
      duration: 1.5,
      opacity: 0,
      ease: Expo.easeInOut,
      stagger: 0.2,
      delay: -1,
    })
    .from(".bounding-element-work", {
      y: "60",
      duration: 1.5,
      opacity: 0,
      ease: Expo.easeInOut,
      stagger: 0.2,
      delay: -1,
    })
    .from(".hero-footer", {
      y: "20",
      duration: 1,
      delay: -1,
      opacity: 0,
      ease: Expo.easeInOut,
      stagger: 0.2,
    });
}

firstPageAnimation();

//Let's select all the mini secitions and get the mouse position for them and
// at that mouse position show image and the image should also rotate along with cursor
// Image should go the way cursor goes.
document.querySelectorAll(".mini-section").forEach(function (elem) {
  let rotate = 0;
  let diffRotate = 0;

  elem.addEventListener("mousemove", (e) => {
    let diff = e.clientY - elem.getBoundingClientRect().top;

    diffRotate = e.clientX - rotate;
    rotate = e.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: e.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffRotate * 0.5),
    });

    gsap.to(elem.querySelector("h1"), {
      opacity: 0.2,
    });
  });

  elem.addEventListener("mouseleave", (e) => {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });

    gsap.to(elem.querySelector("h1"), {
      opacity: 1,
    });
  });
});

function updateTime() {
  const now = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const formattedTime = now.toLocaleTimeString("en-US", options);
  const formattedYear = now.getFullYear();
  document.querySelector(".time").textContent = formattedTime;
  document.querySelector(".year").textContent = formattedYear;
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial call to display the time immediately
updateTime();
