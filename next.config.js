/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    REACT_APP_FLUX_API: process.env.REACT_APP_FLUX_API
  },
  async redirects() {
    return [
      {
        "source": "/interior-design",
        "destination": "/interior-design/portfolio",
        permanent: true,
      },
      {
        "source": "/home",
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/news-and-media",
        "destination": "/news-and-media/featured-articles",
        permanent: true,
      },
      {
        "source": "/shopping",
        "destination": "/store",
        permanent: true,
      },
      {
        "source": "/before-after",
        "destination": "/interior-design/before-after",
        permanent: true,
      },
      {
        "source": "/portfolio",
        "destination": "/interior-design/portfolio",
        permanent: true,
      },
      {
        "source": "/services",
        "destination": "/interior-design/services",
        permanent: true,
      },
      {
        "source": "/shop-1",
        "destination": "/store",
        permanent: true,
      },
      {
        "source": "/single-project",
        "destination": "/interior-design/portfolio",
        permanent: true,
      },
      {
        "source": "/copy-of-testimonials",
        "destination": "/testimonials",
        permanent: true,
      },
      {
        "source": "/copy-of-illuminating-beauty",
        "destination": "/interior-design/portfolio/modern-mediterranean/illuminating-beauty",
        permanent: true,
      },
      {
        "source": "/copy-of-casual-acadian",
        "destination": "/interior-design/portfolio/southern-serene/casual-acadian",
        permanent: true,
      },
      {
        "source": "/product-page/i-m-a-product",
        "destination": "/interior-design/portfolio",
        permanent: true,
      },
      {
        "source": "/product-page/i-m-a-product-11",
        "destination": "/interior-design/portfolio",
        permanent: true,
      },
      {
        "source": "/product-page/i-m-a-product-9",
        "destination": "/interior-design/portfolio",
        permanent: true,
      },
      {
        "source": "/product-page/i-m-a-product-6",
        "destination": "/interior-design/portfolio",
        permanent: true,
      },
      {
        "source": "/product-page/i-m-a-product-3",
        "destination": "/interior-design/portfolio",
        permanent: true,
      },
      {
        "source": "/interior-design/portfolio/modern-mediterranean/contact",
        "destination": "/interior-design/portfolio/modern-mediterranean",
        permanent: true,
      },
      {
        "source": "/interior-design/portfolio/southern-serene/contact",
        "destination": "/interior-design/portfolio/southern-serene",
        permanent: true,
      },
      {
        "source": "/interior-design/portfolio/royal-granduer/contact",
        "destination": "/interior-design/portfolio/royal-granduer",
        permanent: true,
      },
      {
        "source": "/interior-design/portfolio/majestic-jewel/contact",
        "destination": "/interior-design/portfolio/majestic-jewel",
        permanent: true,
      },
      {
        "source": "/interior-design/portfolio/enchanting-beauty/contact",
        "destination": "/interior-design/portfolio/enchanting-beauty",
        permanent: true,
      },
      {
        "source": "/interior-design/portfolio/champagne-taste/contact",
        "destination": "/interior-design/portfolio/champagne-taste",
        permanent: true,
      },
      {
        "source": "/interior-design/portfolio/contact",
        "destination": "/interior-design/portfolio",
        permanent: true,
      },
      {
        "source": "/interior-design/contact",
        "destination": "/interior-design/portfolio",
        permanent: true,
      },
      {
        "source": "/photography/contact",
        "destination": "/interior-design/portfolio",
        permanent: true,
      },
      {
        "source": "/events/contact",
        "destination": "/store/events",
        permanent: true,
      },
      {
        "source": "/rentals/contact",
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/seasonal/contact",
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/news-and-media/contact",
        "destination": "/news-and-media/featured-articles",
        permanent: true,
      },
      {
        "source": "/store/contact",
        "destination": "/store",
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
