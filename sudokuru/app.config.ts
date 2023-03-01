import 'dotenv/config';
import {JwtPayload} from "jwt-decode";

// this config file may override the app.json config file. Will have to experiment.

export interface AppConfig {
    DOMAIN: string,
    CLIENT_ID: string,
    AUDIENCE: string,
    SCOPE: string
}

export interface Auth0JwtPayload extends JwtPayload {
    nickname: string,
    name: string,
    picture: string,
    updated_at: string,
    nonce?: string
}

export default {
    name: 'Sudokuru',
    slug: 'sudokuru',
    scheme: 'sudokuru',
    owner: "sudokuru",
    version: '0.0.0',
    platforms: [
        "ios",
        "android"
    ],
    orientation: "portrait",
    updates: {
        fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        bundleIdentifier: "sudokuru.vercel.app",
        supportsTablet: true
    },
    android: {
        package: "sudokuru.vercel.app"
    },
    extra: {
        DOMAIN: process.env.DOMAIN,
        CLIENT_ID: process.env.CLIENT_ID,
        AUDIENCE: process.env.AUDIENCE,
        SCOPE: process.env.SCOPE,
        eas: {
            projectId: "23c4c607-ead6-4786-9a9c-03f57a97dac7"
        }
    },
};