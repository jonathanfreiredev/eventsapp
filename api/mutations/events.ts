import { apiClient } from "@/api/client";
import { useSession } from "@/components/common/AuthContext";
import { CategoryType } from "@/types/categories";
import { Event } from "@/types/events";
import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "../lib/getAccessToken";

export type CreateAddressInput = {
  street: string;
  city: string;
  zip: string;
  country: string;
}

export type CreateEventInput = {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  capacity: number;
  category: CategoryType;
  address: CreateAddressInput;
}

export type EditEventInput = CreateEventInput & {
  id: string;
}

export const useCreateEvent = () => {
  const { session } = useSession();

  return useMutation<Event, Error, CreateEventInput>({
    mutationKey: ['createEvent'],
    mutationFn: async (event: CreateEventInput): Promise<Event> => {
      if (!session) {
        throw new Error("You must be logged in to edit your profile");
      }

      const accessToken = getAccessToken(session);

      const { data } = await apiClient.post('/events', event, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
  });
};

export const useEditEvent = () => {
  const { session } = useSession();

  return useMutation<Event, Error, EditEventInput>({
    mutationKey: ['editEvent'],
    mutationFn: async (event: EditEventInput): Promise<Event> => {
      const {id, ...input} = event;
      
      if (!session) {
        throw new Error("You must be logged in to edit your profile");
      }

      const accessToken = getAccessToken(session);

      const { data } = await apiClient.put(`/events/${id}`, input, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
  });
}

export const useParticipateInEvent = () => {
  const { session } = useSession();

  return useMutation<void, Error, string>({
    mutationKey: ['participateInEvent'],
    mutationFn: async (eventId: string): Promise<void> => {
      if (!session) {
        throw new Error("You must be logged in to participate in events");
      }

      const accessToken = getAccessToken(session);

      await apiClient.post(`/events/${eventId}/participate`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
  });
}

export const useLeaveEvent = () => {
  const { session } = useSession();

  return useMutation<void, Error, string>({
    mutationKey: ['leaveEvent'],
    mutationFn: async (eventId: string): Promise<void> => {
      if (!session) {
        throw new Error("You must be logged in to leave events");
      }

      const accessToken = getAccessToken(session);

      await apiClient.delete(`/events/${eventId}/participate`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
  });
}