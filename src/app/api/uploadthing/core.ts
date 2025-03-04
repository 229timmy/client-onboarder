import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10
    }
  })
    .middleware(() => {
      return {};
    })
    .onUploadComplete((res) => {
      console.log("Upload complete:", res);
      return { url: res.file.url };
    }),

  docUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10
    },
    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 10
    }
  })
    .middleware(() => {
      return {};
    })
    .onUploadComplete((res) => {
      console.log("Upload complete:", res);
      return { url: res.file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter; 