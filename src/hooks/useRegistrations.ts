import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Registration, CreateRegistrationInput } from "@/types";

// ── Fetch registrations for an event ──
async function fetchRegistrations(eventId: string): Promise<Registration[]> {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Registration[]) ?? [];
}

// ── Check if a specific email is already registered ──
async function checkExistingRegistration(
  eventId: string,
  email: string
): Promise<Registration | null> {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("event_id", eventId)
    .eq("email", email)
    .maybeSingle();

  if (error) throw error;
  return data as Registration | null;
}

// ── Hooks ──

export function useRegistrations(eventId: string | undefined) {
  return useQuery({
    queryKey: ["registrations", eventId],
    queryFn: () => fetchRegistrations(eventId!),
    enabled: !!eventId,
  });
}

export function useCheckRegistration(
  eventId: string | undefined,
  email: string | undefined
) {
  return useQuery({
    queryKey: ["registration-check", eventId, email],
    queryFn: () => checkExistingRegistration(eventId!, email!),
    enabled: !!eventId && !!email && email.includes("@"),
  });
}

export function useRegisterForEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateRegistrationInput) => {
      const { data, error } = await supabase
        .from("registrations")
        .insert(input)
        .select()
        .single();

      if (error) {
        // Handle unique constraint violations
        if (error.code === "23505") {
          if (error.message.includes("email")) {
            throw new Error(
              "This email is already registered for this event."
            );
          }
          if (error.message.includes("registration_number")) {
            throw new Error(
              "This registration number is already registered for this event."
            );
          }
          throw new Error("You are already registered for this event.");
        }
        throw error;
      }
      return data as Registration;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["registrations", variables.event_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["registration-check", variables.event_id],
      });
      // Refresh event data to get updated registered_count
      queryClient.invalidateQueries({ queryKey: ["event", variables.event_id] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

export function useDeleteRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      eventId,
    }: {
      id: string;
      eventId: string;
    }) => {
      const { error } = await supabase
        .from("registrations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return { eventId };
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["registrations", variables.eventId],
      });
      queryClient.invalidateQueries({
        queryKey: ["event", variables.eventId],
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}
