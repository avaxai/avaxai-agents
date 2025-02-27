import { settings } from "@elizaos/core";
import express from "express";

// Simple API key authentication middleware
export function apiKeyAuth(
  req: express.Request, 
  res: express.Response, 
  next: express.NextFunction
) {
  // Get the API key from request headers
  const apiKey = req.headers['x-api-key'];
  
  // Get the expected API key from environment variables
  const validApiKey = settings.AGENT_SERVER_API_KEY;
  
  // Check if the provided API key matches the expected one
  if (apiKey && apiKey === validApiKey) {
    // API key is valid, proceed to the next middleware or route handler
    next();
  } else {
    // API key is invalid or missing
    res.status(401).json({
        error: "Unauthorized: Invalid or missing API key",
    });
  }
}
