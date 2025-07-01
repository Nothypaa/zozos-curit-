# How to Start the Website

## Quick Start Commands

### 1. Start the Website Server
```bash
python -m http.server 3000
```

**What this does:**
- Starts a local web server on port 3000
- Serves your HTML files
- Website will be available at: `http://localhost:3000`

### 2. If You Have API Proxy Server
```bash
python api_proxy.py
```

**What this does:**
- Starts the Google API proxy on port 8080
- Handles API requests to avoid CORS issues
- Must run alongside the web server

## Full Startup Process

1. **Open Terminal** in your project folder:
   ```bash
   cd "/home/mahan/Desktop/zozosécurité"
   ```

2. **Start Web Server:**
   ```bash
   python -m http.server 3000
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

## Running Both Servers (if needed)

**Terminal 1:**
```bash
python -m http.server 3000
```

**Terminal 2:**
```bash
python api_proxy.py
```

## Stop the Servers

Press `Ctrl + C` in each terminal window to stop the servers.

---

**Note:** Only the web server (`python -m http.server 3000`) is needed for basic website functionality. The API proxy is only needed if you're using Google Reviews integration. 