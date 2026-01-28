# Deployment Configuration - DO NOT CHANGE

## ✅ CORRECT SETUP (Current)

### Project Structure:
```
/project
  /api
    index.js          ← Backend server (Express app)
    /models           ← Database models
    package.json      ← Backend dependencies
  /client             ← Frontend (React app)
  vercel.json         ← Vercel configuration
```

### Critical Files:

#### 1. vercel.json (Root)
- **Purpose**: Tells Vercel how to build the backend
- **Location**: `/project/vercel.json`
- **DO NOT DELETE THIS FILE**

#### 2. client/src/config.js
- **Current value**: `'https://farmer-helper-flame.vercel.app'`
- **DO NOT change to localhost**
- **DO NOT create `.env.local` in client folder**

#### 3. api/index.js
- **This is your main backend file**
- **Must export**: `module.exports = app;`
- **CORS is configured manually** (lines 12-23)

## ⚠️ VERCEL DASHBOARD SETTINGS

### Root Directory Setting:
- **MUST BE EMPTY** (not "server", not "api", EMPTY!)
- Location: Vercel Dashboard → Project → Settings → Root Directory
- If this is set to anything, deployment will fail

### How to Check:
1. Go to https://vercel.com/dashboard
2. Click your project
3. Click "Settings"
4. Scroll to "Root Directory"
5. Make sure it says "." or is empty
6. If it says "server", DELETE IT and click Save
7. Go to Deployments → Redeploy

## 🚫 THINGS THAT WILL BREAK IT

1. **Creating `client/.env.local`** - Will make phone connect to localhost
2. **Changing Root Directory in Vercel** - Will cause 404 errors
3. **Deleting `vercel.json`** - Vercel won't know how to build
4. **Moving files out of `api/` folder** - Vercel won't find them
5. **Changing `config.js` to use environment variables** - Phone will fail

## ✅ HOW TO MAKE CHANGES SAFELY

### To Update Backend Code:
1. Edit `api/index.js`
2. Commit and push to GitHub
3. Vercel will auto-deploy
4. Wait 2 minutes
5. Test on phone in Incognito mode

### To Update Frontend:
1. Edit files in `client/src/`
2. Run `npm run deploy` from `client/` folder
3. Wait 2 minutes for GitHub Pages
4. Clear browser cache or use Incognito

## 🔧 IF IT BREAKS AGAIN

### Symptom: "Network Error" on phone
**Solution**: 
1. Check Vercel dashboard for deployment errors
2. Make sure Root Directory is empty
3. Clear phone browser cache or use Incognito

### Symptom: 404 NOT_FOUND
**Solution**:
1. Check if `vercel.json` exists in root
2. Check if Vercel Root Directory setting is empty
3. Redeploy from Vercel dashboard

### Symptom: Works on laptop, not on phone
**Solution**:
1. Phone has cached old version
2. Use Incognito mode on phone
3. Or clear browser data

## 📝 DEPLOYMENT CHECKLIST

Before deploying:
- [ ] `vercel.json` exists in root
- [ ] `api/index.js` exports the app
- [ ] `client/src/config.js` points to Vercel URL
- [ ] No `.env.local` in client folder
- [ ] Vercel Root Directory is empty

After deploying:
- [ ] Wait 2-3 minutes
- [ ] Test in Incognito mode
- [ ] Check both laptop and phone
