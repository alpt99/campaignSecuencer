import * as Yup from "yup";

export const campaignSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Title is too long")
    .min(1, "Title is too short"),
  description: Yup.string()
    .required("Description is required")
    .max(255, "Description is too long")
    .min(1, "Description is too short"),
  nodes_attributes: Yup.array()
    .of(
      Yup.object()
        .shape({
          node_id: Yup.string().required("Node id is required"),
          node_type: Yup.string().required("Node type is required"),
          node_description: Yup.string().required(
            "Node description is required"
          ),
          email_subject: Yup.string(),
          email_content: Yup.string(),
          time_interval: Yup.number(),
        })
        .test(
          "oneOfRequired",
          "Either node_subject or time_interval is required",
          (value) =>
            (value.email_subject !== undefined &&
              value.email_content !== undefined) ||
            value.time_interval !== undefined
        )
    )
    .required("Nodes are required")
    .min(1, "At least one node is required"),
  edges_attributes: Yup.array().required("Edges are required").min(1),
});

export const emailConfigSchema = Yup.object().shape({
  emailSubject: Yup.string()
    .required("Email subject is required")
    .max(100, "Email subject is too long")
    .min(1, "Email subject is too short"),
  emailContent: Yup.string().required("Email content is required"),
});
