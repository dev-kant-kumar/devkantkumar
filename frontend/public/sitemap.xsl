<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
                exclude-result-prefixes="sitemap image news">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Interactive XML Sitemap | Dev Kant Kumar</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet" />
        <style>
          :root {
            --bg-main: #090d16;
            --bg-card: rgba(21, 28, 46, 0.6);
            --bg-row: #111827;
            --bg-row-alt: #161e2e;
            --bg-hover: rgba(59, 130, 246, 0.1);
            --border-color: rgba(46, 59, 94, 0.4);
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --text-link: #38bdf8;
            --accent-cyan: #22d3ee;
            --accent-blue: #60a5fa;
            --accent-purple: #c084fc;
            --accent-gradient: linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #a855f7 100%);
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            --glass-blur: blur(12px);
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            background-color: var(--bg-main);
            color: var(--text-main);
            line-height: 1.6;
            padding: 2rem 1rem;
            min-height: 100vh;
            background-image: 
              radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.03) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
            background-attachment: fixed;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
          }

          /* Header Styling */
          header {
            margin-bottom: 2.5rem;
            position: relative;
          }

          .hero-container {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            backdrop-filter: var(--glass-blur);
            border-radius: 24px;
            padding: 2.5rem;
            box-shadow: var(--shadow-lg);
            position: relative;
            overflow: hidden;
          }

          .hero-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--accent-gradient);
          }

          .header-title-wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1.5rem;
          }

          .header-main h1 {
            font-size: 2.25rem;
            font-weight: 800;
            letter-spacing: -0.025em;
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5rem;
          }

          .header-main p {
            color: var(--text-muted);
            font-size: 1.05rem;
            max-width: 700px;
          }

          /* Navigation Pills */
          .sitemap-nav {
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
          }

          .nav-pill {
            display: inline-flex;
            align-items: center;
            padding: 0.6rem 1.2rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid var(--border-color);
            color: var(--text-muted);
          }

          .nav-pill:hover {
            color: var(--text-main);
            border-color: var(--accent-blue);
            background: rgba(59, 130, 246, 0.1);
            transform: translateY(-1px);
          }

          .nav-pill.active {
            background: var(--accent-gradient);
            color: #000;
            font-weight: 700;
            border-color: transparent;
            box-shadow: 0 4px 14px rgba(56, 189, 248, 0.4);
          }

          /* Stats Cards */
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.25rem;
            margin-bottom: 2.5rem;
          }

          .stat-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            backdrop-filter: var(--glass-blur);
            border-radius: 16px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            box-shadow: var(--shadow-md);
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease, border-color 0.3s ease;
          }

          .stat-card:hover {
            transform: translateY(-2px);
            border-color: rgba(59, 130, 246, 0.4);
          }

          .stat-card-label {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
          }

          .stat-card-value {
            font-size: 2rem;
            font-weight: 800;
            color: var(--text-main);
            line-height: 1.2;
          }

          .stat-card-sub {
            font-size: 0.75rem;
            color: var(--text-muted);
            margin-top: 0.25rem;
          }

          /* Interactive Controls */
          .controls-section {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            backdrop-filter: var(--glass-blur);
            border-radius: 16px;
            padding: 1.25rem;
            margin-bottom: 1.5rem;
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            align-items: center;
            justify-content: space-between;
            box-shadow: var(--shadow-sm);
          }

          .search-wrapper {
            position: relative;
            flex-grow: 1;
            max-width: 450px;
            width: 100%;
          }

          .search-input {
            width: 100%;
            padding: 0.75rem 1rem 0.75rem 2.5rem;
            background: rgba(17, 24, 39, 0.7);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            color: var(--text-main);
            font-family: inherit;
            font-size: 0.925rem;
            transition: all 0.3s ease;
          }

          .search-input:focus {
            outline: none;
            border-color: var(--accent-blue);
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
            background: rgba(17, 24, 39, 0.9);
          }

          .search-icon {
            position: absolute;
            left: 0.85rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
            pointer-events: none;
            width: 16px;
            height: 16px;
          }

          .filters-wrapper {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          .filter-btn {
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid var(--border-color);
            color: var(--text-muted);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .filter-btn:hover {
            color: var(--text-main);
            border-color: var(--text-muted);
          }

          .filter-btn.active {
            background: rgba(59, 130, 246, 0.15);
            color: var(--accent-blue);
            border-color: var(--accent-blue);
          }

          /* Sitemap Table Card */
          .table-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            backdrop-filter: var(--glass-blur);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: var(--shadow-lg);
          }

          .table-responsive {
            overflow-x: auto;
            width: 100%;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 0.9rem;
          }

          th {
            background: rgba(15, 23, 42, 0.8);
            color: var(--text-main);
            font-weight: 700;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.08em;
            padding: 1rem 1.25rem;
            border-bottom: 2px solid var(--border-color);
            cursor: pointer;
            user-select: none;
            white-space: nowrap;
            transition: background-color 0.2s ease;
          }

          th:hover {
            background: rgba(30, 41, 59, 0.9);
          }

          th.sort-asc::after {
            content: " ▲";
            font-size: 0.7rem;
            color: var(--accent-cyan);
          }

          th.sort-desc::after {
            content: " ▼";
            font-size: 0.7rem;
            color: var(--accent-cyan);
          }

          tr {
            transition: background-color 0.2s ease;
          }

          tr.odd-row {
            background-color: rgba(17, 24, 39, 0.3);
          }

          tr.even-row {
            background-color: rgba(31, 41, 55, 0.2);
          }

          tr:hover {
            background-color: rgba(59, 130, 246, 0.06) !important;
          }

          td {
            padding: 1rem 1.25rem;
            border-bottom: 1px solid var(--border-color);
            vertical-align: middle;
          }

          /* Path / URL Display */
          .url-cell {
            max-width: 450px;
            word-break: break-all;
          }

          .url-link {
            color: var(--text-link);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
            display: inline-flex;
            align-items: center;
          }

          .url-link:hover {
            color: var(--accent-cyan);
            text-decoration: underline;
          }

          .url-path {
            font-size: 0.75rem;
            color: var(--text-muted);
            display: block;
            margin-top: 0.2rem;
            word-break: break-all;
          }

          /* Badges */
          .badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.25rem 0.6rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.02em;
          }

          .badge-priority {
            background: rgba(34, 211, 238, 0.1);
            color: var(--accent-cyan);
            border: 1px solid rgba(34, 211, 238, 0.2);
          }

          .badge-priority-high {
            background: rgba(168, 85, 247, 0.15);
            color: var(--accent-purple);
            border: 1px solid rgba(168, 85, 247, 0.3);
          }

          .badge-priority-critical {
            background: rgba(239, 68, 68, 0.15);
            color: #f87171;
            border: 1px solid rgba(239, 68, 68, 0.3);
          }

          .badge-freq {
            font-weight: 600;
            border: 1px solid transparent;
          }

          .badge-freq-daily {
            background: rgba(16, 185, 129, 0.1);
            color: #34d399;
            border-color: rgba(16, 185, 129, 0.2);
          }

          .badge-freq-weekly {
            background: rgba(59, 130, 246, 0.1);
            color: #93c5fd;
            border-color: rgba(59, 130, 246, 0.2);
          }

          .badge-freq-monthly {
            background: rgba(245, 158, 11, 0.1);
            color: #fcd34d;
            border-color: rgba(245, 158, 11, 0.2);
          }

          .lastmod-text {
            font-family: monospace;
            color: var(--text-main);
            font-size: 0.85rem;
          }

          /* Media / Rich info styling */
          .media-info {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            max-width: 250px;
          }

          .media-badge {
            display: inline-flex;
            align-items: center;
            font-size: 0.75rem;
            font-weight: 500;
            color: var(--text-main);
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid var(--border-color);
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            width: fit-content;
          }

          .media-icon {
            margin-right: 0.35rem;
          }

          .media-detail {
            font-size: 0.75rem;
            color: var(--text-muted);
            line-height: 1.3;
          }

          .media-preview-img {
            max-width: 60px;
            max-height: 45px;
            border-radius: 4px;
            object-fit: cover;
            border: 1px solid var(--border-color);
            margin-top: 0.25rem;
          }

          /* No Results display */
          .no-results {
            padding: 3rem;
            text-align: center;
            color: var(--text-muted);
            font-weight: 500;
          }

          .no-results svg {
            width: 48px;
            height: 48px;
            margin-bottom: 1rem;
            stroke: var(--text-muted);
            opacity: 0.6;
          }

          /* Footer */
          footer {
            margin-top: 3rem;
            text-align: center;
            color: var(--text-muted);
            font-size: 0.8rem;
            border-top: 1px solid var(--border-color);
            padding-top: 1.5rem;
          }

          footer a {
            color: var(--accent-cyan);
            text-decoration: none;
          }

          footer a:hover {
            text-decoration: underline;
          }

          /* Responsive Tweaks */
          @media (max-width: 768px) {
            body {
              padding: 1rem 0.5rem;
            }
            .hero-container {
              padding: 1.5rem;
              border-radius: 16px;
            }
            .header-title-wrap {
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
            }
            .controls-section {
              flex-direction: column;
              align-items: stretch;
            }
            .search-wrapper {
              max-width: 100%;
            }
            td, th {
              padding: 0.75rem 0.85rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="hero-container">
              <div class="header-title-wrap">
                <div class="header-main">
                  <h1>XML Sitemap Dashboard</h1>
                  <p>
                    A visual directory generated automatically to assist search engines in discovering all contents. Renders standard schema elements, Google News extensions, and media embeds beautifully.
                  </p>
                </div>
                <!-- Navigation links to switch between sitemaps -->
                <nav class="sitemap-nav">
                  <a href="/sitemap.xml" id="nav-sitemap-main" class="nav-pill">Main Index</a>
                  <a href="/sitemap-blog.xml" id="nav-sitemap-blog" class="nav-pill">Blog Sitemap</a>
                  <a href="/sitemap-marketplace.xml" id="nav-sitemap-marketplace" class="nav-pill">Marketplace</a>
                </nav>
              </div>
            </div>
          </header>

          <!-- Stats Grid -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-card-label">Total URLs</div>
              <div id="stat-total" class="stat-card-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)" /></div>
              <div class="stat-card-sub">Indexable routes found</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-label">Rich Articles</div>
              <div id="stat-blog" class="stat-card-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[news:news])" /></div>
              <div class="stat-card-sub">Google News standard</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-label">Media Elements</div>
              <div id="stat-media" class="stat-card-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[image:image])" /></div>
              <div class="stat-card-sub">Structured image descriptors</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-label">Primary Priority</div>
              <div id="stat-priority" class="stat-card-value">
                <!-- Fallback calculating priority or listing max -->
                1.0
              </div>
              <div class="stat-card-sub">Highest crawl priority</div>
            </div>
          </div>

          <!-- Controls Section -->
          <div class="controls-section">
            <div class="search-wrapper">
              <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" id="sitemap-search" class="search-input" placeholder="Search paths, categories, titles..." oninput="filterSitemap()" />
            </div>

            <!-- Categories filter buttons -->
            <div class="filters-wrapper">
              <button id="filter-all" class="filter-btn active" onclick="setFilter('all')">All Pages</button>
              <button id="filter-core" class="filter-btn" onclick="setFilter('core')">Core Portfolio</button>
              <button id="filter-blog" class="filter-btn" onclick="setFilter('blog')">Blog</button>
              <button id="filter-marketplace" class="filter-btn" onclick="setFilter('marketplace')">Marketplace</button>
              <button id="filter-tools" class="filter-btn" onclick="setFilter('tools')">Developer Tools</button>
            </div>
          </div>

          <!-- Sitemap Table Card -->
          <div class="table-card">
            <div class="table-responsive">
              <table id="sitemap-table">
                <thead>
                  <tr>
                    <th id="th-idx" style="width: 60px; text-align: center;">#</th>
                    <th id="th-url" class="sort-asc" onclick="sortTable(1)">URL Route</th>
                    <th id="th-freq" onclick="sortTable(2)" style="width: 130px; text-align: center;">Frequency</th>
                    <th id="th-priority" onclick="sortTable(3)" style="width: 120px; text-align: center;">Priority</th>
                    <th id="th-lastmod" onclick="sortTable(4)" style="width: 140px;">Last Modified</th>
                    <th id="th-media" style="width: 250px;">Media &amp; Metadata</th>
                  </tr>
                </thead>
                <tbody id="sitemap-tbody">
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr class="sitemap-row">
                      <!-- Render Row Class alternating -->
                      <xsl:attribute name="class">
                        <xsl:text>sitemap-row </xsl:text>
                        <xsl:if test="position() mod 2 = 1">odd-row</xsl:if>
                        <xsl:if test="position() mod 2 = 0">even-row</xsl:if>
                      </xsl:attribute>
                      
                      <!-- Row Index -->
                      <td style="text-align: center; color: var(--text-muted); font-size: 0.8rem; font-weight: 600;">
                        <xsl:value-of select="position()"/>
                      </td>

                      <!-- URL route details -->
                      <td class="url-cell">
                        <a class="url-link">
                          <xsl:attribute name="href">
                            <xsl:value-of select="sitemap:loc" />
                          </xsl:attribute>
                          <xsl:attribute name="target">_blank</xsl:attribute>
                          <!-- Render dynamic domain-free label for cleaner UI if possible, else full link -->
                          <xsl:value-of select="sitemap:loc" />
                        </a>
                        <!-- Sub-text showing path -->
                        <span class="url-path">
                          <xsl:value-of select="substring-after(sitemap:loc, 'devkantkumar.com')" />
                        </span>
                      </td>

                      <!-- Change Frequency Badge -->
                      <td style="text-align: center;">
                        <xsl:if test="sitemap:changefreq">
                          <span>
                            <xsl:attribute name="class">
                              <xsl:text>badge badge-freq badge-freq-</xsl:text>
                              <xsl:value-of select="sitemap:changefreq" />
                            </xsl:attribute>
                            <xsl:value-of select="sitemap:changefreq" />
                          </span>
                        </xsl:if>
                        <xsl:if test="not(sitemap:changefreq)">
                          <span style="color: var(--text-muted);">-</span>
                        </xsl:if>
                      </td>

                      <!-- Priority Badge -->
                      <td style="text-align: center;">
                        <xsl:if test="sitemap:priority">
                          <span>
                            <xsl:attribute name="class">
                              <xsl:text>badge badge-priority</xsl:text>
                              <xsl:if test="sitemap:priority &gt;= 0.9"> badge-priority-high</xsl:if>
                              <xsl:if test="sitemap:priority = 1.0"> badge-priority-critical</xsl:if>
                            </xsl:attribute>
                            <xsl:value-of select="sitemap:priority" />
                          </span>
                        </xsl:if>
                        <xsl:if test="not(sitemap:priority)">
                          <span style="color: var(--text-muted);">-</span>
                        </xsl:if>
                      </td>

                      <!-- Last Modified Date -->
                      <td>
                        <xsl:if test="sitemap:lastmod">
                          <span class="lastmod-text"><xsl:value-of select="sitemap:lastmod" /></span>
                        </xsl:if>
                        <xsl:if test="not(sitemap:lastmod)">
                          <span style="color: var(--text-muted);">-</span>
                        </xsl:if>
                      </td>

                      <!-- Rich Media & Metadata (News, Images) -->
                      <td>
                        <div class="media-info">
                          <!-- Image details -->
                          <xsl:if test="image:image">
                            <div class="media-badge">
                              <span class="media-icon">🖼️</span>
                              <span>Image: <xsl:value-of select="count(image:image)"/></span>
                            </div>
                            <xsl:if test="image:image/image:title">
                              <span class="media-detail" style="font-weight: 500; color: var(--text-main);">
                                <xsl:value-of select="image:image/image:title"/>
                              </span>
                            </xsl:if>
                            <xsl:if test="image:image/image:caption">
                              <span class="media-detail">
                                <xsl:value-of select="image:image/image:caption"/>
                              </span>
                            </xsl:if>
                            <!-- Render a small image thumbnail if it's an HTTP location -->
                            <xsl:if test="contains(image:image/image:loc, 'http')">
                              <img class="media-preview-img" loading="lazy">
                                <xsl:attribute name="src">
                                  <xsl:value-of select="image:image/image:loc" />
                                </xsl:attribute>
                                <xsl:attribute name="alt">Sitemap thumbnail</xsl:attribute>
                              </img>
                            </xsl:if>
                          </xsl:if>

                          <!-- News details -->
                          <xsl:if test="news:news">
                            <div class="media-badge" style="background: rgba(192, 132, 252, 0.15); border-color: rgba(192, 132, 252, 0.3);">
                              <span class="media-icon">📰</span>
                              <span style="color: var(--accent-purple); font-weight: 600;">Google News</span>
                            </div>
                            <xsl:if test="news:news/news:title">
                              <span class="media-detail" style="font-weight: 500; color: var(--text-main); font-style: italic;">
                                "<xsl:value-of select="news:news/news:title"/>"
                              </span>
                            </xsl:if>
                            <xsl:if test="news:news/news:publication/news:name">
                              <span class="media-detail">
                                Publ: <xsl:value-of select="news:news/news:publication/news:name"/>
                              </span>
                            </xsl:if>
                            <xsl:if test="news:news/news:keywords">
                              <span class="media-detail" style="font-size: 0.7rem; color: var(--accent-cyan);">
                                Tags: <xsl:value-of select="news:news/news:keywords"/>
                              </span>
                            </xsl:if>
                          </xsl:if>

                          <xsl:if test="not(image:image) and not(news:news)">
                            <span style="color: var(--text-muted); font-size: 0.8rem;">Standard Web Page</span>
                          </xsl:if>
                        </div>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>

            <!-- No results visual block -->
            <div id="no-results-block" class="no-results" style="display: none;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No matching routes or metadata contents found.</p>
            </div>
          </div>
        </div>

        <footer>
          <p>
            XML Sitemap powered by XSL | Created with ❤️ by <a href="https://www.devkantkumar.com" target="_blank">Dev Kant Kumar</a>. All rights reserved.
          </p>
        </footer>

        <!-- Embedded Interactive JavaScript -->
        <script>
          //<![CDATA[
          // Set active navigation pill based on current URL path
          const currentPath = window.location.pathname;
          if (currentPath.includes('blog')) {
            document.getElementById('nav-sitemap-blog').classList.add('active');
          } else if (currentPath.includes('marketplace')) {
            document.getElementById('nav-sitemap-marketplace').classList.add('active');
          } else {
            document.getElementById('nav-sitemap-main').classList.add('active');
          }

          // Active filter state
          let activeFilter = 'all';

          // Client-side quick filter
          function setFilter(category) {
            activeFilter = category;
            
            // Toggle active visual states on filter buttons
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            document.getElementById('filter-' + category).classList.add('active');
            
            // Re-apply search/filter
            filterSitemap();
          }

          // Combined search + category filter function
          function filterSitemap() {
            const query = document.getElementById('sitemap-search').value.toLowerCase().trim();
            const rows = document.querySelectorAll('#sitemap-tbody tr.sitemap-row');
            let visibleCount = 0;

            rows.forEach((row, idx) => {
              const urlCell = row.querySelector('.url-cell');
              const urlText = urlCell ? urlCell.textContent.toLowerCase() : '';
              const mediaCell = row.querySelector('.media-info');
              const mediaText = mediaCell ? mediaCell.textContent.toLowerCase() : '';
              
              // 1. Check search query matching URL or metadata
              const matchesSearch = query === '' || urlText.includes(query) || mediaText.includes(query);

              // 2. Check category filter matching path pattern
              let matchesCategory = true;
              if (activeFilter === 'blog') {
                matchesCategory = urlText.includes('/blog') || urlText.includes('sitemap-blog');
              } else if (activeFilter === 'marketplace') {
                matchesCategory = urlText.includes('/marketplace') || urlText.includes('sitemap-marketplace');
              } else if (activeFilter === 'tools') {
                matchesCategory = urlText.includes('/tools');
              } else if (activeFilter === 'core') {
                // Core: pages that are not blog, tools, or marketplace
                matchesCategory = !urlText.includes('/blog') && !urlText.includes('/marketplace') && !urlText.includes('/tools');
              }

              // Apply display status
              if (matchesSearch && matchesCategory) {
                row.style.display = '';
                visibleCount++;
                
                // Adjust alternating background shading
                row.classList.remove('odd-row', 'even-row');
                row.classList.add(visibleCount % 2 === 1 ? 'odd-row' : 'even-row');
              } else {
                row.style.display = 'none';
              }
            });

            // Handle no results display
            const noResultsBlock = document.getElementById('no-results-block');
            if (visibleCount === 0) {
              noResultsBlock.style.display = 'block';
            } else {
              noResultsBlock.style.display = 'none';
            }

            // Update Total URLs count stat dynamically to reflect filtered set
            document.getElementById('stat-total').textContent = visibleCount;
          }

          // Sorting variables
          let sortDirection = 1; // 1 = Ascending, -1 = Descending
          let currentSortColumn = -1;

          function sortTable(colIndex) {
            const table = document.getElementById('sitemap-table');
            const tbody = document.getElementById('sitemap-tbody');
            const rows = Array.from(tbody.querySelectorAll('tr.sitemap-row'));
            const headers = table.querySelectorAll('thead th');

            // Reset headers styling classes
            headers.forEach(th => th.classList.remove('sort-asc', 'sort-desc'));

            if (currentSortColumn === colIndex) {
              sortDirection *= -1; // Toggle order
            } else {
              sortDirection = 1; // Default Ascending
              currentSortColumn = colIndex;
            }

            // Apply styling indicator
            const currentHeader = headers[colIndex];
            currentHeader.classList.add(sortDirection === 1 ? 'sort-asc' : 'sort-desc');

            const sortedRows = rows.sort((a, b) => {
              let valA = '', valB = '';

              if (colIndex === 1) { // URL sort
                valA = a.querySelector('.url-link').textContent.trim();
                valB = b.querySelector('.url-link').textContent.trim();
              } else if (colIndex === 2) { // Change Frequency sort
                const badgeA = a.querySelector('.badge-freq');
                const badgeB = b.querySelector('.badge-freq');
                valA = badgeA ? badgeA.textContent.trim() : '';
                valB = badgeB ? badgeB.textContent.trim() : '';
              } else if (colIndex === 3) { // Priority sort (float comparison)
                const badgeA = a.querySelector('.badge-priority');
                const badgeB = b.querySelector('.badge-priority');
                const pA = badgeA ? parseFloat(badgeA.textContent.trim()) : 0.0;
                const pB = badgeB ? parseFloat(badgeB.textContent.trim()) : 0.0;
                return (pA - pB) * sortDirection;
              } else if (colIndex === 4) { // Lastmod date sort
                const dateA = a.querySelector('.lastmod-text');
                const dateB = b.querySelector('.lastmod-text');
                valA = dateA ? dateA.textContent.trim() : '0000-00-00';
                valB = dateB ? dateB.textContent.trim() : '0000-00-00';
              }

              return valA.localeCompare(valB) * sortDirection;
            });

            // Re-render row layout
            tbody.innerHTML = '';
            sortedRows.forEach((row, index) => {
              tbody.appendChild(row);
            });

            // Re-apply current query filtering and stripe patterns
            filterSitemap();
          }

          // Initialize priority calculation (e.g. check average or count of high priorities)
          (function initStats() {
            const priorityBadges = document.querySelectorAll('.badge-priority');
            let sum = 0;
            priorityBadges.forEach(badge => {
              sum += parseFloat(badge.textContent.trim());
            });
            if (priorityBadges.length > 0) {
              const avg = (sum / priorityBadges.length).toFixed(2);
              document.getElementById('stat-priority').textContent = avg;
              document.querySelector('.stat-card:nth-child(4) .stat-card-sub').textContent = 'Average crawl priority';
            }
          })();
          //]]>
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
